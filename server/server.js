import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { initializeSocket } from "./socket/socket.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import milestoneRoutes from "./routes/milestoneRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

connectDB();

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/activities", activityRoutes);

app.get("/", (req, res) => {
  res.send("Collaborative Project API Running");
});

const PORT = process.env.PORT || 5000;

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
