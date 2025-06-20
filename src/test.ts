import { TwitterApi } from "twitter-api-v2";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as dotenv from "dotenv";

dotenv.config();

async function testTwitterIntegration() {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  });

  const llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY!,
    modelName: "gemini-1.5-flash",
  });

  try {
   
    console.log("Testing tweet posting...");
    const tweet = await client.v2.tweet(
      "Hello from Base AI Agent! 🤖 #TestTweet"
    );
    console.log("Tweet posted:", tweet.data.id);
    console.log("\nTesting mentions retrieval...");
    const mentions = await client.v2.userMentionTimeline(
      process.env.TWITTER_USER_ID!
    );
    console.log("Recent mentions:", mentions.data);

    console.log("\nAll tests passed!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testTwitterIntegration().catch(console.error);
