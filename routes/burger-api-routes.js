var db = require("../models");

module.exports = function(app) {
    app.get("/burgerList", function(req, res) {
        db.Burgers.findAll({}).then(function(dbGet) {
            res.json(dbGet);
        });
    });

    app.post("/addBurger", function(req, res) {
        db.Burgers.create(req.body).then(function(dbPost) {
            res.json(dbPost);
        });
    });
};