require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { TwitterApi } = require("twitter-api-v2");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Initialize Twitter client
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Endpoint to post a tweet
app.post("/api/postToX", async (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: "Username and message are required" });
  }

  try {
    const tweet = `@${username} Here's an update:\n\n${message}`;
    const response = await client.v2.tweet(tweet);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error posting to X:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
