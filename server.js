<<<<<<< HEAD
// import dependencies
var express = require('express');
=======
// import dependencies 
var express = require("express");
>>>>>>> 9812736f56639a30c1c8466f4659bb5e4c3a9ed1
var exphbs = require("express-handlebars");

// setup the express app
var app = express();
var PORT = process.env.PORT || 8080;

<<<<<<< HEAD
// require models for syncing
=======
// Require our models for syncing 
>>>>>>> 9812736f56639a30c1c8466f4659bb5e4c3a9ed1
var db = require("./models");

// configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define static directory
app.use(express.static("public"));

// setup handelbars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
require("./routes/api-routes.js")(app);
require("./routes/view-routes.js")(app);

// start the server
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening at http://localhost:" + PORT);
    });
});
