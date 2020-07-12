const db = require("../models");

module.exports = function (app) {
    app.get("/api", function (req, res) {
        res.redirect('/');
    });

    app.post("/api", async function (req, res) {
        const { name, breed, gender, longitude, latitude, profile_url } = req.body;
        const dog = await db.Dogs.create({ name, breed, gender, longitude, latitude, profile_url });
        res.status(201);
        res.redirect('/');
    });
};
