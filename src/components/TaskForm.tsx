import { Calendar, Plus, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NewTask, Task } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SuccessBox from "./SuccessBox";
import { createTask, updateTask } from "../api";
import { useNavigate } from "react-router-dom";

interface TaskFormProps {
  task?: Task | null; // task object to edit or null if it's for adding a new task
  mode?: "edit" | "add"; // mode to determine if it is "edit" or "add"
  onClose?: () => void; // Function to close the form
  onTaskAdded?: (newTask: Task) => void;
}
const TaskForm: React.FC<TaskFormProps> = ({
  task,
  mode = "add",
  onClose,
  onTaskAdded,
}) => {
  const naviagte = useNavigate();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [message, setMessage] = useState<string>("");

  const [showSuccess, setShowSuccess] = useState(false);
  const datepickerRef = useRef<HTMLDivElement>(null);
  const [taskData, setTaskData] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    priority: "low",
    due_date: "",
    status: "todo",
  });

  useEffect(() => {
    if (mode === "edit" && task) {
      setTaskData({
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.due_date,
        status: task.status,
      });
    }
  }, [task, mode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTaskSubmit = async () => {
    if (!taskData.title.trim()) {
      alert("Title is required!");
      return;
    }
    if (!taskData.due_date) {
      alert("Deadline is required!");
      return;
    }
    try {
      if (mode === "add") {
        // Creating a new task
        const newTask = {
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          due_date: taskData.due_date,
          status: taskData.status || "todo",
        };
        const createdTask = await createTask(newTask);

        setMessage("Task successfully created!");
        if (onTaskAdded) {
          onTaskAdded(createdTask); // Notify the parent component
        }
        // Assuming createTask is a function that handles API requests
        console.log("Task Created:", newTask);

        setShowSuccess(true);
      } else if (mode === "edit" && taskData._id) {
        // Updating an existing task
        const updatedTask = {
          ...taskData,

          due_date: taskData.due_date,
        };

        if (onTaskAdded) {
          onTaskAdded(updatedTask);
        }
        // Fire the API call in the background:
        updateTask(taskData._id, updatedTask)
          .then(() => {
            setMessage("Task successfully updated!");
            setShowSuccess(true);
          })
          .catch((error) => {
            console.error("Error updating task:", error);
            // Optionally: revert the optimistic update or show an error message.
          });
      }
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };
  const handleBackToHome = () => {
    setShowSuccess(false); // Hide success message
    onClose?.(); // Close the form
    naviagte("/"); // Redirect to homepage
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };
    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDatePicker]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      {showSuccess ? (
        <SuccessBox onBack={handleBackToHome} message={message} />
      ) : (
        <div className=" relative w-[333px] h-[504px] pt-5 pr-5 pl-5 gap-2 rounded-[10px] border border-1 bg-white border-[rgba(121,121,121,1)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <button className="absolute top-2 right-2 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition text-white font-bold">
            ✕
          </button>
          <div className="w-[293px] h-[458px] gap-[14px]">
            <div className="w-[293px] h-[44px] flex justify-between pb-[14px] border-b border-b-[rgba(225,226,234,1)] items-center">
              <div className="w-[273px] h-[30px] gap-[6px] flex items-center">
                <div className="w-[8px] h-[8px] bg-[rgba(32,231,244,1)] rounded-full"></div>
                <span className="font-poppins font-semibold text-[20px] leading-[30px] tracking-[0%] text-black">
                  {mode === "edit" ? "EDIT TASK" : "ADD TASK"}
                </span>
              </div>

              <div className="w-[20px] h-[20px] gap-[10px] rounded-[15px] p-[10px] bg-white mb-3.5">
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition text-white font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
            <form className="w-[293px] h-[400px] gap-[14px] rounded-[16px] flex flex-col p-[16px] mt-2 relative">
              <div className="w-full flex justify-between border-b border-black pb-2">
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleInputChange}
                  placeholder="Task Title"
                  className="w-full font-poppins font-bold text-[14px] leading-[18px] tracking-[0%] text-[rgba(17,17,17,1)]"
                  required
                />
                <MoreVertical
                  className="w-[20px] h-[20px] text-[rgba(156,157,164,1)] cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="absolute right-0 top-6 bg-white border border-gray-300 rounded shadow-md p-2 w-[150px] z-50 mt-3">
                    <label className="block text-sm font-poppins">
                      Status:
                    </label>
                    <select
                      name="status"
                      className="w-full p-1 border rounded"
                      value={taskData.status}
                      onChange={handleInputChange}
                    >
                      <option value="todo">todo</option>
                      <option value="in_progress">in_progress</option>
                      <option value="done">done</option>
                      <option value="timeout">timeout</option>
                    </select>
                    <label className="block text-sm font-poppins mt-2">
                      Priority:
                    </label>
                    <select
                      name="priority"
                      className="w-full p-1 border rounded"
                      value={taskData.priority}
                      onChange={handleInputChange}
                    >
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                  </div>
                )}
              </div>
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleInputChange}
                placeholder="Task Description"
                className="w-full h-[318px]  rounded p-2 font-poppins font-normal text-[14px] leading-[18px] tracking-[0%] text-[rgba(17,17,17,1)]"
              />
              <div className="w-full flex justify-between items-center mt-3 ">
                <button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="w-[100px] flex items-center gap-2 font-poppins font-bold text-[12px] leading-[16px] tracking-[0%] text-[rgba(90,90,90,1)] cursor-pointer border-none bg-transparent"
                >
                  {taskData.due_date
                    ? new Date(taskData.due_date).toLocaleDateString("en-GB")
                    : "Deadline"}
                </button>
                {showDatePicker && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div
                      ref={datepickerRef}
                      className="bg-white p-4 rounded-lg shadow-lg"
                    >
                      <DatePicker
                        selected={
                          taskData.due_date ? new Date(taskData.due_date) : null
                        }
                        onChange={(date: Date | null) => {
                          setTaskData((prev) => ({
                            ...prev,
                            due_date: date ? date.toISOString() : "", // Store empty string if date is null
                          }));
                          setShowDatePicker(false); // Close after selecting date
                        }}
                        inline
                        minDate={new Date()}
                      />
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleTaskSubmit}
                  className="w-[73px] h-[16px] font-poppins font-bold text-[12px] leading-[16px] tracking-[0%] text-[rgba(90,90,90,1)] cursor-pointer z-20"
                >
                  {mode === "edit" ? "UPDATE" : "SAVED"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
