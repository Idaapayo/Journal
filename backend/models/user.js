"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // A user can have many notes
            User.hasMany(models.Note, {
                foreignKey: "userId",
            });
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        },
    );
    return User;
};
