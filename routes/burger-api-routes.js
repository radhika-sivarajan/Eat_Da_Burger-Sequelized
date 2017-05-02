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

    app.put("/devourBurger", function(req, res) {
        db.Burgers.update({
            devoured: req.body.devoured
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
            console.log(dbPost);
        });
    });
};