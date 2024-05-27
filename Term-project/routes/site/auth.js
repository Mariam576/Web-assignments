const express = require("express");
let router = express.Router();
let User = require("../../models/User");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const bcrypt = require("bcryptjs");

router.get("/login", function (req, res, next) {
  return res.render("auth/login");
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.flash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    res.flash("success", "Logged in Successfully");
   
    return res.redirect("/");
  } else {
    res.flash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});
router.get("/contactUs.html", isAuthenticated, (req, res) => {
  res.render("contactUs");
});

const Message = require('../../models/messages');



router.post('/contactUs.html', isAuthenticated, async (req, res) => {
  try {
      const { firstName, lastName, email, message } = req.body;
      console.log('Received message:', { firstName, lastName, email, message });

      // Check if the logged-in user's email matches the email provided in the contact form
      if (req.session.user.email !== email) {
          res.flash("danger", "Provided email does not match logged-in user's email");
          return res.redirect("/contactUs.html");
      } else {
          res.flash("success", "Thank you for your message! We will get back to you soon");
          const newMessage = new Message({
              firstName,
              lastName,
              email,
              message
          });

          await newMessage.save();

          return res.redirect("/contactUs.html");
      }
  } catch (error) {
      console.error("Error:", error);
      res.flash("danger", "An error occurred");
      return res.redirect("/contactUs.html");
  }
});
router.get("/register", function (req, res, next) {
  return res.render("auth/register");
});
router.get("/logout", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.redirect("/login");
});
router.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.flash("danger", "User with given email already registered");
    return res.redirect("/register");
  }
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();
  return res.redirect("/login");
});


module.exports = router;