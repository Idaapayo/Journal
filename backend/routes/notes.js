const express = require("express");
const router = express.Router();
const db = require("../models");

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
        console.log("the id", req.params.id);
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

module.exports = router;
