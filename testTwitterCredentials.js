require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Initialize Twitter client
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function testTwitterCredentials() {
  try {
    const response = await client.v2.me();
    console.log('Success! Twitter credentials are valid:', response);
  } catch (error) {
    console.error('Error validating Twitter credentials:', error);
  }
}

testTwitterCredentials();
