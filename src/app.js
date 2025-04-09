require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./utils/connect");
const userRoutes = require("../src/routes/userRoutes");
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
// database connect
connectDB();
const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);

app.get("/", (req, res) => res.status(200).json({ message: "Server is live" }));
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

