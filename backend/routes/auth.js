const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models");
const bcrypt = require("bcryptjs");

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
    res.status(200).json({ message: "Logged in", user: req.user });
});

router.post("/signUp", async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the new username is already taken
        const existingUser = await db.User.findOne({
            where: { username: username },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const user = await db.User.create({ username, password });
        res.status(201).json({ user, message: "User created successfully" });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Error creating user",
        });
    }
});

router.put(
    "/updateCredentials/:userId",
    ensureAuthenticated,
    async (req, res) => {
        try {
            const userId = req.params.userId;
            const { username, password } = req.body;
            // Check if username and password are provided
            if (!username || !password) {
                return res.status(400).json({
                    message: "New username and new password are required.",
                });
            }
            // Check if the new username is already taken
            const existingUser = await db.User.findOne({
                where: { username: username },
            });
            if (existingUser && existingUser.id !== parseInt(userId, 10)) {
                return res
                    .status(400)
                    .json({ message: "Username already exists" });
            }
            // Update user's credentials in the database
            const updatedUser = await db.User.update(
                {
                    username: username,
                    password: await bcrypt.hash(password, 10),
                },
                { where: { id: userId } },
            );
            res.status(200).json(updatedUser);
        } catch (e) {
            res.status(500).json({
                error: e.message,
                message: "Error updating credentials",
            });
        }
    },
);

router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return res
                .status(500)
                .json({ message: "Error logging out", error: err });
        }
        res.status(200).json({ message: "Logged out" });
    });
});

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "This request is unauthorized" });
}

module.exports = { ensureAuthenticated };

module.exports.router = router;
