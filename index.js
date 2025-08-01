const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = [];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/send", (req, res) => {
  const { sender, message, fromRoblox } = req.body;
  if (sender && message) {
    messages.push({ sender, message, fromRoblox });
    if (messages.length > 100) messages.shift();
    res.json({ status: "ok" });
  } else {
    res.status(400).json({ error: "Missing sender or message" });
  }
});

// <-- add this route handler:
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
