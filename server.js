// import dependencies 
var express = require("express");
var exphbs = require("express-handlebars");

// setup the express app
var app = express();
var PORT = process.env.PORT || 8080;

// Require our models for syncing 
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
db.sequelize.sync()
    .then(() => {
        //db.sequelize.sync() // builds the table if it doesn't already exist
        app.listen(PORT, () => {
            console.log("App listening at http://localhost:" + PORT)
        })
    })
    .catch(() => {
        console.log('connection failed')
    })

// db.sequelize.sync({ force: true }) - this command initializes and deletes the entire database