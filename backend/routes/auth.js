const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local");

router.post("/login", (req, res) => {});
