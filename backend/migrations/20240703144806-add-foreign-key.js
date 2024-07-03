"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint("Notes", {
            fields: ["userId"],
            type: "foreign key",
            name: "fk_userId", // optional: provide a custom name for the constraint
            references: {
                table: "Users",
                field: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint("Notes", "fk_userId");
    },
};
