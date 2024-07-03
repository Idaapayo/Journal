"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Note extends Model {
        static associate(models) {
            // Notes can only belong to one user
            Note.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    Note.init(
        {
            title: DataTypes.STRING,
            content: DataTypes.TEXT,
            category: DataTypes.STRING,
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
        },
        {
            sequelize,
            modelName: "Note",
        },
    );
    return Note;
};
