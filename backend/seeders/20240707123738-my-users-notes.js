"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert(
            "Notes",
            [
                {
                    title: "Grocery List",
                    category: "Personal",
                    text: "Buy milk, eggs, and bread from the store.",
                    userId: 16,
                    createdAt: new Date("2023-01-01"),
                    updatedAt: new Date("2023-01-01"),
                },
                {
                    title: "Meeting Notes",
                    category: "Work",
                    text: "Discuss project milestones and deadlines in the meeting.",
                    userId: 16,
                    createdAt: new Date("2023-01-15"),
                    updatedAt: new Date("2023-01-15"),
                },
                {
                    title: "Workout Plan",
                    category: "Fitness",
                    text: "Monday: Cardio, Wednesday: Strength training, Friday: Yoga.",
                    userId: 16,
                    createdAt: new Date("2023-02-01"),
                    updatedAt: new Date("2023-02-01"),
                },
                {
                    title: "Vacation Ideas",
                    category: "Travel",
                    text: "Consider visiting Japan, Italy, or Australia for the next vacation.",
                    userId: 16,
                    createdAt: new Date("2023-02-10"),
                    updatedAt: new Date("2023-02-10"),
                },
                {
                    title: "Books to Read",
                    category: "Leisure",
                    text: '1. "The Great Gatsby" by F. Scott Fitzgerald\n2. "To Kill a Mockingbird" by Harper Lee\n3. "1984" by George Orwell',
                    userId: 16,
                    createdAt: new Date("2023-02-20"),
                    updatedAt: new Date("2023-02-20"),
                },
                {
                    title: "Recipe: Chocolate Cake",
                    category: "Cooking",
                    text: "Ingredients: Flour, cocoa powder, sugar, eggs, butter. Instructions: Mix ingredients and bake at 350°F for 30 minutes.",
                    userId: 16,
                    createdAt: new Date("2023-03-01"),
                    updatedAt: new Date("2023-03-01"),
                },
                {
                    title: "Birthday Gift Ideas",
                    category: "Personal",
                    text: "1. Custom photo album\n2. Handmade jewelry\n3. Gourmet chocolate box",
                    userId: 16,
                    createdAt: new Date("2023-03-15"),
                    updatedAt: new Date("2023-03-15"),
                },
                {
                    title: "Project Roadmap",
                    category: "Work",
                    text: "Q1: Initial research and planning\nQ2: Development phase\nQ3: Testing and feedback\nQ4: Launch and review",
                    userId: 16,
                    createdAt: new Date("2023-04-01"),
                    updatedAt: new Date("2023-04-01"),
                },
                {
                    title: "Meditation Schedule",
                    category: "Wellness",
                    text: "Daily meditation for 10 minutes in the morning and 10 minutes before bed.",
                    userId: 16,
                    createdAt: new Date("2023-04-10"),
                    updatedAt: new Date("2023-04-10"),
                },
                {
                    title: "Home Renovation Ideas",
                    category: "Home",
                    text: "1. Paint the living room\n2. Upgrade the kitchen cabinets\n3. Install new lighting fixtures in the hallway",
                    userId: 16,
                    createdAt: new Date("2023-04-20"),
                    updatedAt: new Date("2023-04-20"),
                },
                {
                    title: "Learning Goals",
                    category: "Education",
                    text: "1. Complete the online course on machine learning\n2. Read a book on data structures and algorithms\n3. Practice coding challenges weekly",
                    userId: 16,
                    createdAt: new Date("2023-05-01"),
                    updatedAt: new Date("2023-05-01"),
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Notes", { userId: 16 }, {});
    },
};
