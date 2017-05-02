module.exports = function(sequelize, DataTypes) {
    var Customers = sequelize.define("Customers", {
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                Customers.hasMany(models.Burgers);
            }
        }
    });
    return Customers;
};