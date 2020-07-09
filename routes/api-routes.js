// require our models
var db = require("../models");

// routes
module.exports = function (app) {
    // @route:  GET /api
    // @desc:   Return all blog posts
    app.get("/api", function (req, res) {
        db.Post.findAll({})
            .then(function (result) {
                res.json(result)
            });
    });

    // @route:  POST /api
    // @desc:   Create a new blog post
    app.post("/api", function (req, res) {
        // destructure request
        var title = req.body.title;
        var body = req.body.body;

        // create payload
        var payload = {
            title: title,
            body: body
        }

        db.Post.create(payload)
            .then(function (result) {
                res.json(result)
            });
    });
};
