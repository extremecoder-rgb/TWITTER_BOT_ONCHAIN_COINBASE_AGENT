import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import * as dotenv from "dotenv";

dotenv.config();

async function debugCDP() {
  console.log("🔍 CDP Explicit Credentials Debug...\n");

  // Show environment variables (masked)
  console.log("Environment Variables:");
  console.log("   CDP_API_KEY_NAME:", process.env.CDP_API_KEY_NAME ? 
    `${process.env.CDP_API_KEY_NAME.substring(0, 8)}...` : "❌ Missing");
  console.log("   CDP_API_KEY_PRIVATE_KEY:", process.env.CDP_API_KEY_PRIVATE_KEY ? 
    `${process.env.CDP_API_KEY_PRIVATE_KEY.substring(0, 8)}...` : "❌ Missing");
  console.log("");

  const config = {
    networkId: "base-sepolia",
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
  };

  console.log("Testing: Explicit credentials with base-sepolia");
  console.log("Config:", JSON.stringify({ ...config, apiKeyPrivateKey: '***' }, null, 2));

  try {
    const agentkit = await CdpAgentkit.configureWithWallet(config);
    console.log("   ✅ SUCCESS! Agentkit initialized successfully");
  } catch (error: any) {
    console.log("   ❌ FAILED:", error.message || error);
    if (error.response) {
      console.log("   Error response:", error.response);
    }
    if (error.stack) {
      console.log("   Stack trace:", error.stack);
    }
    console.log("   Full error:", error);
  }

  console.log("\n🎯 Debug complete!");
}

debugCDP().catch(console.error); 