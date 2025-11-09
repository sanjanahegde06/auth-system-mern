const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "mysecret@123";
const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/authdb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" MongoDB connection error:", err.message));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password)
      return res.status(400).json({ err: "Username and password required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ err: "User already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.send({ message: "User registered successfully", user: { username: newUser.username } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Signup failed");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const user = await User.findOne({ username });

    if (!user)
      return res.status(401).send({ err: "Invalid username or password" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(401).send({ err: "Invalid username or password" });

    const token = jwt.sign({ username, id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.send({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: "Login failed" });
  }
});

function authorizeMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).send("No token provided");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Token invalid or expired");
    req.user = user;
    next();
  });
}

app.get("/auth", authorizeMiddleware, (req, res) => {
  res.send({
    message: "Authenticated Access",
    user: req.user,
  });
});

app.use(express.static(__dirname));
app.get("/", (_, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(5000, () => console.log(" Server running on http://localhost:5000"));
