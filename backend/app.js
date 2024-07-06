const express = require("express");
const session = require("express-session");
const passport = require("passport");
// const authRoutes = require("./routes/auth");
const { router: authRoutes } = require("./routes/auth");
const notesRoutes = require("./routes/notes");
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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    }),
);
app.use(passport.authenticate("session"));

// Routes
app.use("/auth", authRoutes);
app.use("/(notes)", notesRoutes);

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
