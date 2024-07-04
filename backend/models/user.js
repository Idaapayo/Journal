"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Note, { foreignKey: "userId" });
        }
        static async hashPassword(password) {
            return await bcrypt.hash(password, 10);
        }

        async comparePassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: async (user) => {
                    user.password = await User.hashPassword(user.password);
                },
                beforeUpdate: async (user) => {
                    user.password = await User.hashPassword(user.password);
                },
            },
        },
    );
    return User;
};
