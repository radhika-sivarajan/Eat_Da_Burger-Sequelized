module.exports = function(sequelize, DataTypes) {
    var Burgers = sequelize.define("Burgers", {
        burgerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
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