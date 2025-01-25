const express = require("express");
const cors = require("cors");
const { TwitterApi } = require("twitter-api-v2"); // Updated to use twitter-api-v2
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your custom domain
app.use(
    cors({
        origin: ["https://plutusai.org", "https://www.plutusai.org"], // Add all valid origins
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve `index.html` at the root route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Twitter API endpoint
app.post("/api/postToX", async (req, res) => {
    const { username, message } = req.body;

    if (!username || !message) {
        return res.status(400).json({ error: "Username and message are required" });
    }

    try {
        const tweet = `Hey, @${username} Here's an update on your token request:\n\n${message}`;
        const client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        });

        // Post the tweet
        const response = await client.v2.tweet(tweet);
        res.status(200).json({ success: true, response });
    } catch (error) {
        console.error("Error posting to X:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server on the Render-assigned port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
