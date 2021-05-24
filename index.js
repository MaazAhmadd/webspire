//index.js file
require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var path = require('path');
const app = express();
const port = process.env.PORT || 8089;

const viewsDir = process.env.VIEWSDIR || "../views/"; // for routing use

/** Database Coonection */
// const db = mysql.createPool({
//     connectionLimit : 10,
//     host: process.env.DBHOST || "localhost",
//     user: process.env.DBUSER || "root",
//     password: process.env.DBPASSWORD || "root",
//     database: process.env.DBNAME || "webspire"
// });
// global.db = db;

/** POST Req.Body Parser */
app.use(bodyParser.urlencoded({ extended: true }));

/** Static Files */
app.use('/assets', express.static(path.join(__dirname, './views/assets'))); // serves assets public

/** Set Templating Engine */
app.use(expressLayouts)
app.set("layout", path.join(__dirname, './views/_Layout.html'))
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

/** Routes */
require("./routes/main")(app, viewsDir);

app.listen(port, () => {
  console.log("Welcome to the Webspire Website!");
  //console.log("This application must run on PORT 8089");
  console.log(`Webspire listening on port ${port}!`)
});