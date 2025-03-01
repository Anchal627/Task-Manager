import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Task from "../models/taskModel";
export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find({}).sort({ created_at: -1 });
  res.json(tasks);
});
export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, status, priority, due_date } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const task = await Task.create({
    title,
    description,
    status: status || "todo",
    priority: priority || "medium",
    due_date: due_date ? new Date(due_date) : undefined,
  });

  res.status(201).json(task);
});
export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, status, priority, due_date } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  task.title = title || task.title;
  task.description = description !== undefined ? description : task.description;
  task.status = status || task.status;
  task.priority = priority || task.priority;
  task.due_date = due_date ? new Date(due_date) : task.due_date;

  const updatedTask = await task.save();
  res.json(updatedTask);
});
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await Task.deleteOne({ _id: req.params.id });
  res.json({ message: "Task removed" });
});
