const db = require("../models");

// api-routes
module.exports = function (app) {
    app.get("/api", function (req, res) {
        db.Dogs.findAll({})
            .then(function (result) {
                res.json(result)
            });
    });

    app.post("/api", function (req, res) {
        const { image, first_name, last_name, breed, gender, age, fixed, latitude, longitude, interests } = req.body

        const payload = {
            image, first_name, last_name, breed, gender, age, fixed, latitude, longitude, interests
        }

        db.Dogs.create(payload)
            .then((result) => {
                res.status(201)
                res.redirect('/')
            });
    });
};
