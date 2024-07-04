const express = require("express");
const router = express.Router();
const passport = require("passport");
// const User = require("../models/user");
const LocalStrategy = require("passport-local");
const db = require("../models");

router.get("/", async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Error fetching users" });
    }
});

// Verify username and password
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.User.findOne({ where: { username } });
            if (!user)
                return done(null, false, { message: "User already exists" });
            const isValid = await user.comparePassword(password);
            if (!isValid)
                return done(null, false, { message: "Invalid password" });
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }),
);

// Persist user info when logging in
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.User.findByPk(id);
        done(null, user);
    } catch (e) {
        done(e);
    }
});

router.post("/login", passport.authenticate("local"), function (req, res) {
    res.send({ message: "Logged in", userId: req.user.id });
});

router.post("/signUp", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.User.create({ username, password });
        res.status(201).json({ user, message: "User created successfully" });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Error creating user",
        });
    }
});

module.exports = router;
