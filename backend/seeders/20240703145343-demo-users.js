"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    username: "user1",
                    password: "password1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "user2",
                    password: "password2",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "user3",
                    password: "password3",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "user4",
                    password: "password4",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "user5",
                    password: "password5",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
