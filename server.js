const express = require("express");
const cors = require("cors");
const Twitter = require("twitter-v2");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS (allow your domain)
app.use(
    cors({
        origin: ["https://plutusai.org", "https://www.plutusai.org"], // Add your domain(s) here
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);

// Middleware to parse JSON
app.use(express.json());

// Serve static files directly (if not in a separate public folder)
app.use(express.static(__dirname));

// Serve `index.html` for the root route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Twitter API setup and endpoint
app.post("/api/postToX", async (req, res) => {
    const { username, message } = req.body;

    if (!username || !message) {
        return res.status(400).json({ error: "Username and message are required" });
    }

    try {
        const tweet = `Hey, @${username} Here's an update on your token request:\n\n${message}`;
        const client = new Twitter({
            consumer_key: process.env.TWITTER_API_KEY,
            consumer_secret: process.env.TWITTER_API_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        });

        const response = await client.post("tweets", { text: tweet });
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
