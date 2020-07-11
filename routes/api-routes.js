// require our models
var db = require("../models");

// routes
module.exports = function (app) {
    // @route:  GET /api
<<<<<<< HEAD
    // @desc:   Return all blog posts
    app.get("/api", function (req, res) {
        db.Post.findAll({})
=======
    // @desc:   Return all dog profiles
    app.get("/api", function (req, res) {
        db.Dog.findAll({})
>>>>>>> 9812736f56639a30c1c8466f4659bb5e4c3a9ed1
            .then(function (result) {
                res.json(result)
            });
    });

    // @route:  POST /api
<<<<<<< HEAD
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
=======
    // @desc:   Create a new dog profile
    app.post("/api", function (req, res) {
        // destructure request
        // var image = req.body.image;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var breed = req.body.breed;
        var gender = req.body.gender;
        var age = req.body.age;
        var fixed = req.body.fixed;
        // var location = req.body.location;
        var interests = req.body.interests;

        // create payload
        var payload = {
            // image: image,
            first_name: first_name,
            last_name: last_name,
            breed: breed,
            gender: gender,
            age: age,
            fixed: fixed,
            // location: location,
            interests: interests
        }

        db.Dog.create(payload)
>>>>>>> 9812736f56639a30c1c8466f4659bb5e4c3a9ed1
            .then(function (result) {
                res.json(result)
            });
    });
<<<<<<< HEAD
};
=======
};
>>>>>>> 9812736f56639a30c1c8466f4659bb5e4c3a9ed1
