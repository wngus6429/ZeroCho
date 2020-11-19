const express = require("express");
const router = express.Router();

router.post("/post", (req, res) => {
  res.json({ id: 1, content: "hello" });
});

router.delete("/post", (req, res) => {
  res.send("api post delete 창이다");
});

module.exports = router;
