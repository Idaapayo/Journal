const express = require("express");
const db = require("./models");

const app = express();
const port = 8080;

app.get("/", async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Error fetching users" });
    }
});

db.sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
