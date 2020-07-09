// import dependencies
var express = require('express');
var exphbs = require("express-handlebars");

// setup the express app
var app = express();
var PORT = process.env.PORT || 8080;

// require models for syncing
var db = require("./models");

// configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define static directory
app.use(express.static("public"));

app.listen(PORT, function () {
    console.log("App listening at http://localhost:" + PORT);
});

