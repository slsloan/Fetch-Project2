<<<<<<< HEAD
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });
=======
// routes
module.exports = function (app) {
    // @route:  GET /
    // @desc:   Render index template
    app.get("/", function (req, res) {
        res.render("index");
    });

    // @route:  GET /dogs
    // @desc:   Return dogs template
    app.get("/dogs", function (req, res) {
        res.render("dogs");
    });
>>>>>>> 9812736f56639a30c1c8466f4659bb5e4c3a9ed1
};