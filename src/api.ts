const API_URL = "https://task-manager-0c3c.onrender.com/api/tasks";
export const createTask = async (taskData: {
  title: string;
  description?: string;
  status: string;
  priority: string;
  due_date: string;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};
export const updateTask = async (id: string, taskData: any) => {
  const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "PUT", // PUT method to update the task
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json(); // Return the updated task or response
};
