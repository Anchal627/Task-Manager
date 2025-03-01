import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import {
  validateTaskInput,
  handleValidationErrors,
} from "../middlewares/validationMiddleware";
const router = express.Router();
router
  .route("/")
  .get(getTasks)
  .post(validateTaskInput, handleValidationErrors, createTask);
router
  .route("/:id")
  .get(getTaskById)
  .put(validateTaskInput, updateTask)
  .delete(deleteTask);
export default router;
