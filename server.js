const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/eventReg", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post("/register", async (req, res) => {
  const { name, email, phone, age, event } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).send("Email already registered.");

    const user = new User({ name, email, phone, age, event });
    await user.save();

    res.status(201).send("Registration successful!");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
