module.exports = function(sequelize, DataTypes) {
    var Customers = sequelize.define("Customers", {
        customerName: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Customers.hasMany(models.Burgers);
            }
        }
    });
    return Customers;
};