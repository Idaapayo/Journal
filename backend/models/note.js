"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Note extends Model {
        static associate(models) {
            // define association here
        }
    }
    Note.init(
        {
            title: DataTypes.STRING,
            text: DataTypes.TEXT,
            category: DataTypes.STRING,
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
