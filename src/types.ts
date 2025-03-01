export interface NewTask {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  due_date: string;
  status?: string; // Optional when creating a task
}

export interface Task extends NewTask {
  _id: string; // Required for tasks from the backend
  status: string; // Ensure status is defined after creation
}
