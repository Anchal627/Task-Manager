import { useState } from "react";
import TaskForm from "./TaskForm";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  due_date: string;
  status: string;
}
interface SliderProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onTaskAdded?: (newTask: Task) => void;
}

const getPriorityStyles = (priority: "low" | "medium" | "high") => {
  switch (priority) {
    case "low":
      return { bg: "bg-[rgba(223,168,116,0.2)]", text: "text-[#D58D49]" };
    case "medium":
      return { bg: "bg-[rgba(255,193,7,0.2)]", text: "text-[#FFC107]" };
    case "high":
      return {
        bg: "bg-[rgba(216,114,125,0.1)]",
        text: "text-[rgba(216,114,125,1)]",
      };
    default:
      return { bg: "bg-gray-200", text: "text-gray-600" };
  }
};
const Slider: React.FC<SliderProps> = ({ tasks, setTasks, onTaskAdded }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // For the selected task
  const [mode, setMode] = useState<"edit" | "add">("add");
  const handleEditClick = (task: Task) => {
    setSelectedTask(task); // Set the task to be edited
    setMode("edit"); // Set mode to 'edit'
  };
  const handleSubmit = (task: Task) => {
    // Handle task update logic here (for example, update the task in the state or call an API)
    console.log("Updated Task:", task);
    setSelectedTask(null); // Close the form after submission
  };
  const deleteTask = async (_id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
    try {
      const response = await fetch(
        `https://task-manager-0c3c.onrender.com/api/tasks/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="relative w-[354px] h-[668px] pt-[20px] pb-[20px] gap-[16px] rounded-[10px]  bg-[#ECEDEE] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center overflow-y-auto overflow-x-hidden">
      {/* header */}
      <div className="flex gap-[7px]">
        <div className="w-[61px] h-[19px]   flex items-center justify-between ">
          <span className="w-[8px] h-[8px] top-[25px] left-[132px] bg-[rgba(80,48,229,1)] rounded-full">
            {" "}
          </span>
          <p className="w-[45px] h-[19px] top-[20px] left-[148px] font-inter font-[500] text-[16px] leading-[19.36px] tracking-[0%]">
            To Do
          </p>
        </div>

        <div className="h-[20px] w-[20px] rounded-[10px] flex items-center text-center">
          <div className="w-[20px] h-[20px]  top-[20px] left-[202px] rounded-[10px] bg-[#E0E0E0] flex items-center justify-center">
            <span className="w-[8px] h-[15px] top=[22px] left-[208px] font-inter font-[500] text-[12px] leading-[14.52px] tracking-[0%] text-[#625F6D]">
              {tasks.length}
            </span>
          </div>
        </div>
      </div>
      {/* border line */}
      <div className="w-[314px] h-[3px] border-[2px] border-[#502FE5]"></div>
      {/* 1 card */}

      {tasks.map((task) => {
        const { bg, text } = getPriorityStyles(task.priority);
        return (
          <div
            key={task._id}
            className=" w-[314px] h-[177px] rounded-[16px] bg-white top-[78px] left-[20px] shadow-md shadow-[rgba(0,0,0,0.25)] flex flex-col p-4"
          >
            <div className="flex justify-between items-center">
              <div
                className={`w-[66px] h-[23px] rounded-[4px] flex items-center justify-center ${bg}`}
              >
                <span className={`text-[12px] font-[500] ${text}`}>
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>
              </div>
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === task._id ? null : task._id)
                }
                className=" text-center  cursor-pointer mb-3 w-[16px] h-[19px]  font-inter font-bold text-[20px] leading-[19.36px] tracking-[-0.07em] text-[#0D062D] "
              >
                ...
              </button>
              {openMenuId === task._id && (
                <div
                  className="absolute bg-white shadow-lg rounded-md py-2 z-1000 w-32 ml-[250px] mt-32"
                  // style={{ top: position.top, right: position.right }}
                >
                  <button
                    onClick={() => {
                      handleEditClick(task);
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteTask(task._id);
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            {/* //heading */}
            <p className=" w-[123px] h-[22px]  font-inter font-semibold text-[18px] leading-[21.78px] tracking-[0%] text-[#0D062D] mt-0.5">
              {task.title}
            </p>
            <p className="w-[274px] h-[30px] top-[153px] left-[40px] font-inter font-[400] text-[12px] leading-[14.52px] tracking-[0%] text-[#787486] mt-2">
              {task.description}
            </p>
            <div className="w-[261px] h-[16px] mt-8 top-[215px] left-[41px] gap-[10px]">
              <div className="w-[107px] h-[16px] flex justify-between gap-[3px]">
                <p className="w-[107px] h-[16px] font-[Poppins] font-bold text-[12px] leading-[16px] tracking-[0%] text-[rgba(90,90,90,1)]">
                  Deadline:{" "}
                </p>
                <span className="font-[Poppins] font-medium text-[12px] leading-[16px] tracking-[0%] text-[#5a5a5a]">
                  {new Date(task.due_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      {selectedTask && mode === "edit" && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <TaskForm
            task={selectedTask}
            mode="edit"
            onClose={() => setSelectedTask(null)}
            onTaskAdded={onTaskAdded}
          />
        </div>
      )}
    </div>
  );
};
export default Slider;
