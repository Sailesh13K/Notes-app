const express = require("express");
const Note = require("../models/Note.js");
const middleware = require("../middleware/middleware.js");

const router = express.Router();
router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newnote = new Note({ title, description, userId: req.user.id });
    await newnote.save();
    return res
      .status(200)
      .json({ success: true, message: "Note created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Adding Note" });
  }
});

router.get("/", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notes" });
  }
});

router.put("/:id", middleware, async (req, res) => {
  try {
    const id = req.params.id; // ✅ Correct way
    const updatedData = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating notes" });
  }
});
router.delete("/:id", middleware, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true, deletedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting notes" });
  }
});

module.exports = router;
