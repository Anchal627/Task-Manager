import express from "express";
import connectToMongo from "./db";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import streamingRoutes from "./routes/streamingRoutes";
connectToMongo();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//routes
// task
app.use("/api/tasks", taskRoutes);
//streaming
app.use("/api/streaming", streamingRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
