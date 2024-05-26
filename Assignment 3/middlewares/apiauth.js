const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

async function apiauth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access denied. No token provided.");
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(400).send("Invalid token: User doesn't exist");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong at the server");
  }
}

module.exports = apiauth;
