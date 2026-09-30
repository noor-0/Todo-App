import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "https://todo-app-0ph3.onrender.com" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "To-do API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error("Could not connect to MongoDB:", err.message);
        process.exit(1);
    });
