var express = require("express");
var app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
mongoose.connect(
  "mongodb+srv://sabathrodriguez:TW1f2ESYHDoO21q7@cluster0-qakat.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var response = "hello json";

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE) {
    response = response.toUpperCase();
  }
  res.json({ message: response });
});
app.get(
  "/now",
  function(req, res, next) {
    req.time = new Date().toLocaleString("en-US", {
      timeZone: "America/Denver"
    });
    next();
  },
  function(req, res) {
    res.json({ time: req.time });
  }
);

/*
  Route parameters are named segments of the URL, 
  delimited by slashes (/). Each segment captures 
  the value of the part of the URL which matches 
  its position. The captured values can be found 
  in the req.params object.
*/
app.get("/:word/echo", (req, res, next) => {
  res.json({ echo: req.params.word });
});

//This is a POST API endpoint
app.post("/name", (req, res, next) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

/*
  The query string is delimited by a question mark (?), 
  and includes field=value couples. Each couple is 
  separated by an ampersand (&). Express can parse the 
  data from the query string, and populate the object 
  req.query
*/
app.get("/name", (req, res, next) => {
  res.json({ name: req.query.first + " " + req.query.last });
});
app.use(express.static(__dirname + "/public"));

// --> 7)  Mount the Logger middleware here

// --> 11)  Mount the body-parser middleware  here

/** 1) Meet the node console. */

/** 2) A first working Express Server */

/** 3) Serve an HTML file */

/** 4) Serve static assets  */

/** 5) serve JSON on a specific route */

/** 6) Use the .env file to configure the app */

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */

/** 9)  Get input from client - Route parameters */

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
