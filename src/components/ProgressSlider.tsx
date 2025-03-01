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

interface ProgressSliderProps {
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
const ProgressSlider: React.FC<ProgressSliderProps> = ({
  tasks,
  setTasks,
  onTaskAdded,
}) => {
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
      <div className="flex gap-[12px] w-[143] h-[20px]">
        <div className="w-[111] h-[19px] gap-[9px]  flex items-center justify-between ">
          <span className="w-[8px] h-[8px] top-[25px] left-[132px] bg-[rgba(255,165,0,1)] rounded-full">
            {" "}
          </span>
          <p className="w-[95px] h-[19px] top-[20px] left-[148px] font-inter font-[500] text-[16px] leading-[19.36px] tracking-[0%]">
            On Progress
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
      <div className="w-[314px] h-[3px] border-[3px] border-[rgba(255,165,0,1)]"></div>
      {/* 1 card */}
      {tasks.length === 0 ? (
        <p className="mt-4 text-center text-gray-500"></p>
      ) : (
        tasks.map((task) => {
          const { bg, text } = getPriorityStyles(task.priority);
          return (
            <div
              key={task._id}
              className="w-[314px] h-[157px] rounded-[16px] bg-white shadow-md flex flex-col p-4 relative"
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
                  className="cursor-pointer mb-3 w-[16px] h-[19px] font-inter font-bold text-[20px] text-[#0D062D]"
                >
                  ...
                </button>
                {openMenuId === task._id && (
                  <div className="absolute bg-white shadow-lg rounded-md py-2 z-10 w-32 ml-[250px] mt-32">
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
              {/* Heading */}
              <p className="w-[210px] h-[22px] font-inter font-semibold text-[18px] text-[#0D062D] mt-0.5">
                {task.title}
              </p>
              <p className="w-[274px] h-[30px] font-inter font-[400] text-[12px] text-[#787486] mt-2">
                {task.description}
              </p>
              <div className="w-[261px] h-[16px] mt-8 flex gap-[10px]">
                <div className="w-[107px] h-[16px] flex justify-between gap-[3px]">
                  <p className="font-[Poppins] font-bold text-[12px] text-[rgba(90,90,90,1)]">
                    Deadline:
                  </p>
                  <span className="font-[Poppins] font-medium text-[12px] text-[#5a5a5a]">
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
        })
      )}

      {/* Edit Task Form */}
      {selectedTask && mode === "edit" && (
        <div className="fixed inset-0 flex items-center justify-center">
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

export default ProgressSlider;
