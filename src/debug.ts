import { TwitterApi } from "twitter-api-v2";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import * as dotenv from "dotenv";

dotenv.config();

async function debugAPIs() {
  console.log("🔍 Starting API Debug...\n");

  // Test 1: Check if .env file is loaded
  console.log("1. Environment Variables Check:");
  console.log("   GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY ? "✅ Set" : "❌ Missing");
  console.log("   TWITTER_API_KEY:", process.env.TWITTER_API_KEY ? "✅ Set" : "❌ Missing");
  console.log("   CDP_API_KEY_NAME:", process.env.CDP_API_KEY_NAME ? "✅ Set" : "❌ Missing");
  console.log("   CDP_API_KEY_PRIVATE_KEY:", process.env.CDP_API_KEY_PRIVATE_KEY ? "✅ Set" : "❌ Missing");
  console.log("");

  // Test 2: Test Google AI API
  console.log("2. Testing Google AI API...");
  try {
    const llm = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY!,
      model: "gemini-1.5-flash",
    });
    
    const response = await llm.invoke("Say 'Hello World' in one word");
    console.log("   ✅ Google AI API working:", response.content);
  } catch (error: any) {
    console.log("   ❌ Google AI API failed:", error.message || error);
  }
  console.log("");

  // Test 3: Test Twitter API
  console.log("3. Testing Twitter API...");
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    });
    
    // Test by getting user info
    const user = await client.v2.me();
    console.log("   ✅ Twitter API working:", `@${user.data.username}`);
  } catch (error: any) {
    console.log("   ❌ Twitter API failed:", error.message || error);
  }
  console.log("");

  // Test 4: Test CDP API
  console.log("4. Testing CDP API...");
  try {
    const config = {
      networkId: "base-sepolia",
    };
    
    const agentkit = await CdpAgentkit.configureWithWallet(config);
    console.log("   ✅ CDP API working: Wallet initialized successfully");
  } catch (error: any) {
    console.log("   ❌ CDP API failed:", error.message || error);
    console.log("   Error details:", error);
  }
  console.log("");

  console.log("🎯 Debug complete!");
}

debugAPIs().catch(console.error); 