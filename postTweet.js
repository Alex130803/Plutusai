const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: "TWITTER_API_KEY",
  appSecret: "TWITTER_API_SECRET",
  accessToken: "TWITTER_ACCESS_TOKEN",
  accessSecret: "TWITTER_ACCESS_TOKEN_SECRET",
});

async function postTweet() {
  try {
    const tweet = "Test tweet from PlutusAI!";
    const response = await client.v2.tweet(tweet);
    console.log("Tweet posted successfully:", response);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

postTweet();
