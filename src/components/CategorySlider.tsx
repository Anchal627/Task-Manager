import { Briefcase, Clock } from "lucide-react";
import { Task } from "../types";
import Slider from "./Slider";
import ProgressSlider from "./ProgressSlider";
import CompletedSlider from "./CompletedSlider";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TimeoutSlider from "./TimeoutSlider";
import { updateTask } from "../api";
const image1 = require("../assets/image1.png");

interface CategorySliderProps {
  searchQuery: string;
  filterStatus: string;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  searchQuery,
  filterStatus,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://task-manager-0c3c.onrender.com/api/tasks"
        );
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks.");
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          const dueDate = new Date(task.due_date);
          const now = new Date();
          if (task.status !== "timeout" && dueDate < now) {
            updateTask(task._id, { ...task, status: "timeout" }).catch((err) =>
              console.error("Failed to update task status to timeout", err)
            );
            return { ...task, status: "timeout" };
          }
          return task;
        })
      );
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  let filteredTasks = searchQuery
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;

  if (filterStatus !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === filterStatus
    );
  }

  const expiredTasks = filteredTasks.filter(
    (task) => task.status === "timeout"
  ).length;
  const activeTasks = filteredTasks.filter(
    (task) => task.status === "todo" || task.status === "in_progress"
  ).length;
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "done"
  ).length;

  const handleTaskAdded = (newOrUpdatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.some((task) => task._id === newOrUpdatedTask._id)
        ? prevTasks.map((task) =>
            task._id === newOrUpdatedTask._id ? newOrUpdatedTask : task
          )
        : [...prevTasks, newOrUpdatedTask]
    );
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="h-auto gap-8 p-4 sm:p-8 flex flex-col sm:flex-row">
      {/* Left Side Cards */}
      <div className="w-full sm:w-[300px] flex flex-col gap-4">
        {/* Expired Tasks Card */}
        <div className="w-full h-[196px] p-4 rounded-lg bg-[#ECEDEE] shadow-md">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full p-3 bg-[#F42D20]">
              <img src={image1} alt="logo1" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Expired Tasks</p>
              <p className="text-2xl font-semibold text-black">
                {expiredTasks}
              </p>
            </div>
          </div>
        </div>

        {/* Active Tasks Card */}
        <div className="w-full h-[196px] p-4 rounded-lg bg-[#ECEDEE] shadow-md">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full p-3 bg-[#E89271] flex items-center justify-center">
              <Briefcase stroke="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                All Active Tasks
              </p>
              <p className="text-2xl font-semibold text-black">{activeTasks}</p>
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="w-full h-[196px] p-4 rounded-lg bg-[#ECEDEE] shadow-md">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full p-3 bg-[#70A1E5] flex items-center justify-center">
              <Clock stroke="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Completed Tasks
              </p>
              <p className="text-2xl font-semibold text-black">
                {completedTasks}
                <span className="text-base font-semibold">/7</span>
              </p>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="w-full h-12 p-2 rounded-full bg-[#0D062D] flex items-center justify-center gap-2"
        >
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.49999 2.33325C7.82216 2.33325 8.08332 2.59442 8.08332 2.91659V11.0833C8.08332 11.4054 7.82216 11.6666 7.49999 11.6666C7.17782 11.6666 6.91666 11.4054 6.91666 11.0833V2.91659C6.91666 2.59442 7.17782 2.33325 7.49999 2.33325Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.83334 7.00008C2.83334 6.67792 3.09451 6.41675 3.41668 6.41675H11.5833C11.9055 6.41675 12.1667 6.67792 12.1667 7.00008C12.1667 7.32225 11.9055 7.58342 11.5833 7.58342H3.41668C3.09451 7.58342 2.83334 7.32225 2.83334 7.00008Z"
              fill="white"
            />
          </svg>
          <span className="text-sm font-medium text-white">Add Task</span>
        </button>
      </div>

      {/* Right Side Sliders */}
      <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-8">
        {filterStatus === "timeout" ? (
          <TimeoutSlider
            tasks={filteredTasks.filter((task) => task.status === "timeout")}
            setTasks={setTasks}
            onTaskAdded={handleTaskAdded}
          />
        ) : filterStatus === "all" ? (
          <>
            <Slider
              tasks={filteredTasks.filter((task) => task.status === "todo")}
              setTasks={setTasks}
              onTaskAdded={handleTaskAdded}
            />
            <ProgressSlider
              tasks={filteredTasks.filter(
                (task) => task.status === "in_progress"
              )}
              setTasks={setTasks}
              onTaskAdded={handleTaskAdded}
            />
            <CompletedSlider
              tasks={filteredTasks.filter((task) => task.status === "done")}
              setTasks={setTasks}
              onTaskAdded={handleTaskAdded}
            />
          </>
        ) : filterStatus === "todo" ? (
          <Slider
            tasks={filteredTasks.filter((task) => task.status === "todo")}
            setTasks={setTasks}
            onTaskAdded={handleTaskAdded}
          />
        ) : filterStatus === "in_progress" ? (
          <ProgressSlider
            tasks={filteredTasks.filter(
              (task) => task.status === "in_progress"
            )}
            setTasks={setTasks}
            onTaskAdded={handleTaskAdded}
          />
        ) : filterStatus === "done" ? (
          <CompletedSlider
            tasks={filteredTasks.filter((task) => task.status === "done")}
            setTasks={setTasks}
            onTaskAdded={handleTaskAdded}
          />
        ) : null}
      </div>

      {/* Task Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <TaskForm
            onClose={() => setIsFormOpen(false)}
            onTaskAdded={handleTaskAdded}
          />
        </div>
      )}
    </div>
  );
};

export default CategorySlider;
