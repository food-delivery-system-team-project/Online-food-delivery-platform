const rateLimit = require("express-rate-limit");
const radisStore = require("rate-limit-redis").default;
const { redisClient } = require("../config/redis");

const globalLimiter = rateLimit({
  store: new radisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 100, //max 100 request per ip
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many request,try again later",
  },
});

module.exports = { globalLimiter };
