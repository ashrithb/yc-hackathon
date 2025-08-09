import { FreestyleSandboxes } from "freestyle-sandboxes";
import { config } from "dotenv";

// Load environment variables from .env file
config();

if (!process.env.FREESTYLE_API_KEY) {
  console.error("Error: FREESTYLE_API_KEY environment variable is required");
  console.error("Please create a .env file and add your API key:");
  console.error("FREESTYLE_API_KEY=your-api-key-here");
  process.exit(1);
}

const api = new FreestyleSandboxes({
  apiKey: process.env.FREESTYLE_API_KEY, // make sure to set this
});

api
  .deployWeb(
    {
      kind: "git",
      url: "https://github.com/ashrithb/yc-hackathon", // Your actual YC hackathon repository
      dir: "frontend", // Tell Freestyle to use the frontend directory as the root
    },
    {
      domains: ["yc-hackathon-app.style.dev"],
      build: true, // automatically detects the framework and builds the code
    }
  )
  .then((result) => {
    console.log("🎉 Your YC hackathon app deployed successfully!");
    console.log("📊 Full result:", result);
    console.log("🌐 Your website is live at: https://yc-hackathon-app.style.dev");
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
  });
