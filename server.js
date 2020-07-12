// import dependencies
const express = require('express');
const exphbs = require("express-handlebars");

// setup the express app
const app = express();
const PORT = process.env.PORT || 8080;

// require models for syncing
const db = require("./models");

// configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define static directory
app.use(express.static(__dirname + '/public'));

// setup handelbars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
require("./routes/api-routes.js")(app);
require("./routes/view-routes.js")(app);

// connect to the database and start the server
async function startServer() {
    try {
        await db.sequelize.authenticate();
        app.listen(PORT, function () {
            console.log("App listening at http://localhost:" + PORT);
        });
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
}
startServer();

// db.sequelize.sync({ force: true }) // -- if you want to delete and rebuild the table from scratch
