const express = require("express");
const router = express.Router();
const passport = require("passport");
// const User = require("../models/user");
const LocalStrategy = require("passport-local");
const db = require("../models");

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

// Update username
router.put("/update-username", ensureAuthenticated, async (req, res) => {
    try {
        // const { id } = req.params;
        // const { username } = req.body;
        // const user = await db.User.findByPk(id);
        // if (!user) {
        //     return res.status(401).json({ message: "User not found" });
        // }
        // user.username = username;
        // await user.save();
        // res.status(200).json({ message: "User updated successfully" });
        const { username } = req.body;

        // Check if the new username is already taken
        const existingUser = await db.User.findOne({
            where: { username: username },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        req.user.username = username;
        await req.user.save();
        // Refresh session
        req.login(req.user, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Error re-authenticating user",
                    error: err,
                });
            }
            res.status(200).json({ message: "Username updated successfully" });
        });
        // res.status(200).json({ message: "Username updated successfully" });
    } catch (e) {
        res.status(500).json({
            message: "Error updating user",
            userId: req.user.id,
            error: e,
        });
    }
});

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
    res.status(401).json({ message: "Unauthorized" });
}

module.exports = { ensureAuthenticated };

module.exports.router = router;
