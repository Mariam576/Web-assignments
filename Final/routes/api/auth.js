const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

// POST request for login
router.post("/token", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("User with this email not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid Password");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        roles: user.roles,
        name: user.name,
        email: user.email,
      },
      config.get("jwtPrivateKey"),
    
    );
    

    return res.render("displaytoken",{token});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
