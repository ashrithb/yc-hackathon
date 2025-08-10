import os
import json
from pathlib import Path
from typing import Dict, List, Optional

import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

from services.personalization_service import PersonalizationService

load_dotenv()

# Get absolute path of current script
SCRIPT_PATH = Path(__file__).resolve()


app = FastAPI()
service = PersonalizationService(
    frontend_src=SCRIPT_PATH.parent.parent / "frontend" / "src",
    components_rel="components",
    app_rel="app",
)


class PersonalizationRequest(BaseModel):
    user_id: str
    # Optional: If provided, we skip fetching from friend's API
    posthog_data: Optional[Dict] = None


@app.get("/health")
async def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/personalize")
async def personalize(req: PersonalizationRequest) -> Dict:
    try:
        result = await service.personalize_website(
            user_id=req.user_id,
            posthog_data=req.posthog_data,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 