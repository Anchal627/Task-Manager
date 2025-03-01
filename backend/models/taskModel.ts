import mongoose from "mongoose";

export type TaskStatus = "todo" | "in_progress" | "done" | "timeout";
export type TaskPriority = "low" | "medium" | "high";
export interface ITask {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: Date;
  created_at: Date;
  updated_at: Date;
  streaming_data?: {
    source: string;
    data: any;
  };
}
const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done", "timeout"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    due_date: {
      type: Date,
    },
    streaming_data: {
      source: String,
      data: mongoose.Schema.Types.Mixed,
    },
  },
  // 3lrfr3ssxspo71hwen6l63v7lgbvyd
  // 5epox60wvmme7w9jlwryeuvy4wf6s8 secret
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
