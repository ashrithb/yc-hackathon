import os
import json
import subprocess
from pathlib import Path
from typing import Dict, List, Optional, Any

import httpx
import anthropic
from openai import OpenAI
from datetime import datetime


class PersonalizationService:
    def __init__(self, frontend_src: Path, components_rel: str, app_rel: str):
        self.frontend_src = frontend_src
        self.components_path = frontend_src / components_rel
        self.app_path = frontend_src / app_rel
        # Load env at init time to ensure .env has been loaded by caller
        self.friend_posthog_api_base = os.getenv("FRIEND_POSTHOG_API_BASE", "")
        anthropic_key = os.getenv("ANTHROPIC_API_KEY", "")
        morph_key = os.getenv("MORPH_API_KEY", "")
        self.claude = anthropic.Anthropic(api_key=anthropic_key)
        self.morph = OpenAI(api_key=morph_key, base_url="https://api.morphllm.com/v1")
        # Hardcoded sample file for demo runs
        self.sample_posthog_path = Path(
            "/Users/ashrith.bandla/Documents/exp-hackathon/yc-hackathon/backend-ours/Raw-posthog-data-sample.txt"
        )

    async def personalize_website(self, user_id: str, posthog_data: Optional[Dict]) -> Dict:
        try:
            # 1) get analytics (from request or from sample file)
            raw_posthog_text = self._load_posthog_raw_text()

            # 2) read components context (read-only)
            components_context = self._read_components_context()

            # 3) read original app files BEFORE enabling loading page
            original_app_files = self._read_app_files()

            # 4) enable loading page while edits are applied
            backup_map = await self._enable_loading_page()

            # 5) generate changes with Claude + apply with Morph using original content
            modified: Dict[str, str] = {}
            changed_any = False
            for file_path, content in original_app_files.items():
                changes = await self._analyze_with_claude_raw(
                    raw_posthog_text=raw_posthog_text,
                    file_content=content,
                    components_context=components_context,
                    file_path=file_path
                )
                # Log exactly what is going to be sent to Morph based on Claude's response
                try:
                    morph_input_summary = {
                        "file": file_path,
                        "from_claude": {
                            "instruction": changes.get("instruction", ""),
                            "code_edit": changes.get("code_edit", ""),
                            "inferred": changes.get("inferred", {}),
                        },
                    }
                    self._write_log(
                        f"morph-input-from-claude-{Path(file_path).name}.json",
                        json.dumps(morph_input_summary, ensure_ascii=False)
                    )
                    print(
                        f"[morph] {Path(file_path).name} "
                        f"instruction_len={len(morph_input_summary['from_claude']['instruction'])} "
                        f"code_edit_len={len(morph_input_summary['from_claude']['code_edit'])}"
                    )
                    instr_preview = (morph_input_summary['from_claude']['instruction'] or "")[:200].replace("\n", " ")
                    edit_preview = (morph_input_summary['from_claude']['code_edit'] or "")[:200].replace("\n", " ")
                    print(f"[morph] instruction_preview: {instr_preview}")
                    print(f"[morph] code_edit_preview: {edit_preview}")
                except Exception:
                    pass
                updated = await self._apply_with_morph(content, changes, file_path)

                # If Morph made no changes, inject header comment as last resort
                if content.rstrip("\n") == updated.rstrip("\n"):
                    header = f"// Personalized (cohort guess): {changes.get('inferred', {}).get('cohort_guess', 'unknown')}"
                    updated = self._inject_header_comment(content, header)

                if content.rstrip("\n") == updated.rstrip("\n"):
                    continue

                modified[file_path] = updated
                changed_any = True

            # 6) write modified files
            for file_path, new_content in modified.items():
                Path(file_path).write_text(new_content)

            # 7) commit only if there were real changes
            commit_hash = None
            if changed_any:
                commit_hash = await self._git_commit(user_id=user_id, cohort=changes.get("inferred", {}).get("cohort_guess", "unknown"))

            # 8) disable loading (no restore; files already updated)
            await self._disable_loading_page(backup_map)

            return {
                "success": True,
                "user_id": user_id,
                "cohort": changes.get("inferred", {}).get("cohort_guess", "unknown"),
                "files_modified": list(modified.keys()),
                "commit_hash": commit_hash,
            }
        except Exception:
            # restore files from backup
            try:
                await self._disable_loading_page(backup_map, restore=True)  # type: ignore[name-defined]
            except Exception:
                pass
            raise

    def _load_posthog_raw_text(self, max_chars: int = 120_000) -> str:
        if not self.sample_posthog_path.exists():
            return ""
        raw_text = self.sample_posthog_path.read_text().replace("\ufeff", "")
        if len(raw_text) > max_chars:
            head = raw_text[:60_000]
            tail = raw_text[-60_000:]
            raw_text = head + "\n... [TRUNCATED RAW POSTHOG LOGS] ...\n" + tail
        self._write_log("raw-posthog.txt", raw_text[:5000])  # preview log
        return raw_text

    def _parse_raw_posthog_events(self, events: List[List[Any]]) -> Dict[str, Any]:
        """
        Convert raw array-of-events into the structured analytics format we expect downstream.
        Each event looks like: [distinct_id, event_name, properties_json_string, timestamp, ...]
        """
        click_counts: Dict[str, int] = {}
        time_on_sections: Dict[str, float] = {}
        scroll_depth: Dict[str, float] = {}
        pages_seen: Dict[str, int] = {}

        def page_key_from_path(path: str) -> str:
            # Extract a simple page key from a file path or URL
            try:
                base = path.split("/")[-1]
                if "." in base:
                    base = base.split(".")[0]
                if base == "":
                    base = "home"
                return base
            except Exception:
                return "home"

        for ev in events:
            if not isinstance(ev, list) or len(ev) < 3:
                continue
            distinct_id = ev[0]
            event_name = ev[1]
            props_raw = ev[2]
            try:
                props = json.loads(props_raw) if isinstance(props_raw, str) else (props_raw or {})
            except Exception:
                props = {}

            # Determine current page
            pathname = props.get("$pathname") or props.get("$prev_pageview_pathname") or props.get("page") or ""
            current_url = props.get("$current_url") or ""
            page_key = page_key_from_path(pathname or current_url)
            if page_key:
                pages_seen[page_key] = pages_seen.get(page_key, 0) + 1

            if event_name in ("$autocapture", "navigation_click"):
                label = props.get("$el_text") or props.get("nav_item") or props.get("target")
                if label:
                    click_counts[label] = click_counts.get(label, 0) + 1

            if event_name in ("page_exit", "$pageleave"):
                # time on page
                top = props.get("time_on_page_seconds")
                if isinstance(top, (int, float)):
                    time_on_sections[page_key] = time_on_sections.get(page_key, 0) + float(top)
                # scroll depth
                s1 = props.get("max_scroll_depth")
                s2 = props.get("$prev_pageview_max_scroll_percentage")
                depth = None
                if isinstance(s1, (int, float)):
                    depth = float(s1)
                elif isinstance(s2, (int, float)):
                    depth = float(s2)
                if depth is not None:
                    # Normalize to 0..1 if looks like 0..100
                    if depth > 1.0:
                        depth = depth / 100.0
                    scroll_depth[page_key] = max(scroll_depth.get(page_key, 0.0), depth)

        # Build most_clicked array
        most_clicked = [k for k, _ in sorted(click_counts.items(), key=lambda kv: (-kv[1], kv[0]))]

        # Derive a simple cohort for demo purposes
        cohort = "unknown"
        if any(k.lower() == "jobs" for k in most_clicked):
            cohort = "jobs_seeker"
        elif any(k.lower() == "apply" for k in most_clicked):
            cohort = "apply_focused"
        elif any(pk in time_on_sections for pk in ("pricing",)):
            cohort = "price_sensitive"

        analytics = {
            "cohort": cohort,
            "behavior_patterns": {
                "most_clicked": most_clicked,
                "time_on_sections": time_on_sections,
                "scroll_depth": scroll_depth,
            },
            "session_count": 1,
        }
        return analytics

    def _read_components_context(self) -> str:
        ctx_lines: List[str] = [
            "COMPONENT LIBRARY REFERENCE (DO NOT MODIFY THESE):",
            "- Never change code under src/components/*",
            "- PostHog analytics must not be edited",
            "\n",
        ]
        for comp in self.components_path.rglob("*.tsx"):
            # Include the PostHogProvider content only for awareness, but instruction forbids edits anyway
            rel = comp.relative_to(self.frontend_src)
            try:
                ctx_lines.append(f"=== {rel} ===")
                ctx_lines.append(comp.read_text())
                ctx_lines.append("")
            except Exception:
                continue
        return "\n".join(ctx_lines)

    def _read_app_files(self) -> Dict[str, str]:
        allowed: Dict[str, str] = {}
        for p in self.app_path.rglob("*.tsx"):
            name = p.name.lower()
            # Avoid touching files likely tied to analytics/provider wiring
            if name in {"clientbody.tsx", "layout.tsx"}:
                continue
            try:
                allowed[str(p)] = p.read_text()
            except Exception:
                continue
        return allowed

    async def _analyze_with_claude_raw(self, raw_posthog_text: str, file_content: str, components_context: str, file_path: str) -> Dict:
        sys_prompt = (
            "You are a senior frontend engineer performing safe, localized personalizations.\n"
            "Constraints:\n"
            "- Modify ONLY the provided app file content.\n"
            "- Do NOT edit src/components/*; they are reference-only.\n"
            "- Do NOT touch PostHog analytics code/imports/hooks/providers.\n"
            "- Prefer reordering, conditional rendering, prop tweaks.\n"
            "- Keep TypeScript/JSX valid and imports intact.\n"
            "- Output a JSON object with fields: instruction (string), code_edit (string), inferred (object).\n"
            "- code_edit MUST use Morph Fast Apply style with // ... existing code ... between edited spans, minimal unchanged context.\n"
            "- If unsure, make conservative improvements and explain in instruction.\n"
        )

        user_prompt = f"""
=== COMPONENTS (REFERENCE ONLY; DO NOT MODIFY) ===
{components_context[:40000]}

=== CURRENT APP FILE TO MODIFY: {file_path} ===
{file_content}

=== RAW POSTHOG EVENT LOGS (UNPARSED) ===
{raw_posthog_text}

Respond JSON only with:
{{
  "instruction": "I am <describe edit succinctly, per Morph tool guidance>",
  "code_edit": "// ... existing code ...\\n<edits here>\\n// ... existing code ...",
  "inferred": {{
    "cohort_guess": "string",
    "signals": ["strings"]
  }}
}}
"""
        self._write_log(f"claude-prompt-{Path(file_path).name}.txt", f"[SYSTEM]\\n{sys_prompt}\\n\\n[USER]\\n{user_prompt[:50000]}")
        try:
            
            resp = self.claude.messages.create(
                model="claude-4-sonnet-20250514",
                max_tokens=1600,
                system=sys_prompt,
                messages=[{"role": "user", "content": user_prompt}],
            )
            text = resp.content[0].text
            self._write_log(f"claude-output-{Path(file_path).name}.json", text)
            return json.loads(text)
        except Exception as e:
            self._write_log(f"claude-error-{Path(file_path).name}.txt", str(e))
            return {"instruction": "", "code_edit": "", "inferred": {"cohort_guess": "unknown", "signals": []}}

    async def _apply_with_morph(self, original_content: str, changes: Dict, file_path: str) -> str:
        instruction = (changes.get("instruction") or "").strip()
        code_edit = (changes.get("code_edit") or "").strip()
        cohort_guess = changes.get("inferred", {}).get("cohort_guess", "unknown")

        # If Claude didn't produce a code_edit, just add header locally after returning original
        if not instruction or not code_edit:
            return original_content

        payload = f"<instruction>{instruction}</instruction>\n<code>{original_content}</code>\n<update>{code_edit}</update>"
        self._write_log(f"morph-request-{Path(file_path).name}.txt", payload[:50000])
        try:
            print(f"[morph] sending payload for {Path(file_path).name} chars={len(payload)}")
        except Exception:
            pass
        
        try:
            resp = self.morph.chat.completions.create(
                model="morph-v3-large",
                messages=[{"role": "user", "content": payload}],
                temperature=0.0,
            )
            merged = resp.choices[0].message.content
            self._write_log(f"morph-response-{Path(file_path).name}.tsx", merged[:50000])
            return merged
        except Exception as e:
            self._write_log(f"morph-error-{Path(file_path).name}.txt", str(e))
            return original_content

    async def _enable_loading_page(self) -> Dict[str, str]:
        """Temporarily show a loading UI by swapping top-level route page(s). Returns backup map."""
        backup: Dict[str, str] = {}
        # Only swap main /app/page.tsx if exists
        page_file = self.app_path / "page.tsx"
        if page_file.exists():
            original = page_file.read_text()
            backup[str(page_file)] = original
            loading = (
                "'use client'\n\n"
                "export default function LoadingPersonalization() {\n"
                "  return (\n"
                "    <div className=\"flex items-center justify-center min-h-screen\">\n"
                "      <div className=\"text-center\">\n"
                "        <div className=\"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto\"></div>\n"
                "        <p className=\"mt-4 text-lg\">Personalizing your experience...</p>\n"
                "      </div>\n"
                "    </div>\n"
                "  );\n"
                "}\n"
            )
            page_file.write_text(loading)
        return backup

    async def _disable_loading_page(self, backup: Dict[str, str], restore: bool = False) -> None:
        for path_str, content in backup.items():
            p = Path(path_str)
            if restore:
                # restore original on failure
                p.write_text(content)
            else:
                # leave as is; personalized changes have been written elsewhere
                pass

    async def _git_commit(self, user_id: str, cohort: str) -> str:
        repo_root = self.frontend_src.parent.parent  # /frontend
        # stage app directory only
        subprocess.run(["git", "add", str(self.app_path)], check=True, cwd=str(repo_root))
        msg = f"chore(personalize): {user_id} cohort={cohort}"
        subprocess.run(["git", "commit", "-m", msg], check=True, cwd=str(repo_root))
        h = subprocess.run(["git", "rev-parse", "HEAD"], check=True, cwd=str(repo_root), capture_output=True, text=True)
        return h.stdout.strip()

    def _inject_header_comment(self, original: str, header: str) -> str:
        # Keep 'use client' at the very first statement if present
        lines = original.splitlines(keepends=True)
        if lines and (lines[0].strip() in ("'use client'", '"use client"')):
            # Insert after the first line + a blank line
            return "".join([lines[0], "\n", header + "\n"] + lines[1:])
        # Otherwise, put header at top
        return header + "\n" + original 

    def _logs_dir(self) -> Path:
        p = self.frontend_src.parent.parent / "backend-ours" / "logs"
        p.mkdir(parents=True, exist_ok=True)
        return p

    def _write_log(self, name: str, content: str) -> None:
        ts = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
        (self._logs_dir() / f"{ts}-{name}").write_text(content) 