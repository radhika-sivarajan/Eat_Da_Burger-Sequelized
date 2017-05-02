module.exports = function(sequelize, DataTypes) {
    var Burgers = sequelize.define("Burgers", {
        burgerName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Burgers.belongsTo(models.Customers, {
                    onDelete: "cascade",
                    foreignKey: {
                        allowNull: true
                    }
                });
            }
        }
    });
    return Burgers;
};