const express = require("express");
const router = express.Router();
const db = require("../models");
const { Sequelize } = require("sequelize");

// Create note
router.post("/create", (req, res) => {
    try {
        const { title, text, category, userId } = req.body;
        const note = db.Note.create({ title, text, category, userId });
        res.status(201).json({ message: "Note created", note });
    } catch (e) {
        res.status(500).json({ error: "Error creating new note" });
    }
});

// Update note
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, category } = req.body;
        const note = await db.Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.title = title;
        note.text = text;
        note.category = category;

        await note.save();
        res.status(201).json({ message: "Note updated", note });
    } catch (e) {
        res.status(500).json({ error: "Error updating note" });
    }
});

// Delete note
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await db.Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        await note.destroy();
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (e) {}
});

// Get categories
router.get("/categories", async (req, res) => {
    try {
        const categories = await db.Note.findAll({
            attributes: [
                [
                    Sequelize.fn("DISTINCT", Sequelize.col("category")),
                    "category",
                ],
            ],
        });
        const categoriesList = categories.map((category) => category.category);
        res.status(200).json({ categories: categoriesList });
    } catch (e) {
        res.status(500).json({ message: "Error getting categories", error: e });
    }
});

// Get notes by category
router.get("/notesByCategory/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const notes = await db.Note.findAll({ where: { category } });
        res.status(200).json(notes);
    } catch (e) {
        res.status(500).json({
            message: "Error getting notes for category",
            error: e,
        });
    }
});

module.exports = router;
