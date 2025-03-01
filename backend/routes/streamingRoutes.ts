import express from "express";
import {
  getStreamingData,
  getStreamingDataForTask,
  getTasksWithStreamingData,
} from "../controllers/streamingController";

const router = express.Router();

router.get("/", getStreamingData);
router.get("/task/:id", getStreamingDataForTask);
router.get("/tasks", getTasksWithStreamingData);

export default router;
