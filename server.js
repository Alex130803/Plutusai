const express = require("express");
const cors = require("cors");
const Twitter = require("twitter-v2");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Twitter API setup
const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Post to X endpoint
app.post("/api/postToX", async (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: "Username and message are required" });
  }

  try {
    const tweet = `@${username} Here's an update on your token request:\n\n${message}`;
    const response = await client.post("tweets", { text: tweet });
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error posting to X:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fallback route for 404
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
