// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
require('dotenv').config();
var cors = require('cors');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const xxxx = process.env.xxxx;


/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "/public/")));
app.use(cors());

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
