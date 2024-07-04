const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");

// Verify username and password
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
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
        const user = await User.findByPk(id);
        done(null, user);
    } catch (e) {
        done(e);
    }
});
