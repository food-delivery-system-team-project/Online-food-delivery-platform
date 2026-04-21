const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.RADIS_URL,
});

redisClient.on("error", (err) => {
  console.log("radis error", err);
});

const connectRadis = async () => {
  try {
    await redisClient.connect();
    console.log("radis cloud connected");
  } catch (error) {
    console.log("radis connection failed:", err);
  }
};

module.exports = {redisClient, connectRadis };
