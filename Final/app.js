const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require("config");
const path = require("path");
const { promisify } = require('util');
const { pipeline } = require('stream');

const methodOverride = require('method-override');
const attachSessionData = require('./middlewares/sessiondata');





const apiauth = require("./middlewares/apiauth");

const app = express();
app.use(methodOverride('_method'));
// Middleware setup
app.use(cookieParser());
app.use(
  session({
    secret: config.get("sessionSecret"),
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(require("./middlewares/siteMiddleware"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route imports
app.use(attachSessionData);


app.use("/api", apiauth, require("./routes/api/songs"));

app.use("/", require("./routes/site/auth"));
app.use("/", require("./routes/site/songs"));
app.use("/", require("./routes/api/auth"));




app.use("/", require("./routes/site/download"));

module.exports = app;
