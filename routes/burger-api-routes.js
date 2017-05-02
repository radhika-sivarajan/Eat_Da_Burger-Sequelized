var db = require("../models");

module.exports = function(app) {
    app.get("/burgerToDevour", function(req, res) {
        db.Burgers.findAll({
            where: {
                devoured: false
            }
        }).then(function(dbGet) {
            res.json(dbGet);
        });
    });

    app.get("/burgerDevoured", function(req, res) {
        db.Burgers.findAll({
            where: {
                devoured: true
            },
            include: [db.Customers]
        }).then(function(dbGet) {
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
            devoured: req.body.devoured,
            CustomerId: req.body.CustomerId
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
            console.log(dbPost);
        });
    });

    app.post("/addCustomer", function(req, res) {
        db.Customers.create(req.body).then(function(dbPost) {
            res.json(dbPost);
        });
    });
};