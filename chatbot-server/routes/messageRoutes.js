const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { username, text } = req.body;
  try {
    const message = new Message({ username, text });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
