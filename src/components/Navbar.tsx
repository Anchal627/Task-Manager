import React, { useState } from "react";

interface NavbarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchQuery, setFilterStatus }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterClick = (status: string) => {
    setFilterStatus(status);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <nav className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-2xl h-20 flex flex-col md:flex-row justify-between items-center bg-[#ECEDEE] p-4 mx-4 mt-12">
      {/* Search Bar */}
      <div className="w-full md:w-[308px] h-[44px] p-[10px] gap-[10px] rounded-[22px] bg-white flex items-center mb-4 md:mb-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.16666 3.33341C5.94499 3.33341 3.33332 5.94509 3.33332 9.16675C3.33332 12.3884 5.94499 15.0001 9.16666 15.0001C12.3883 15.0001 15 12.3884 15 9.16675C15 5.94509 12.3883 3.33341 9.16666 3.33341ZM1.66666 9.16675C1.66666 5.02461 5.02452 1.66675 9.16666 1.66675C13.3088 1.66675 16.6667 5.02461 16.6667 9.16675C16.6667 13.3089 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3089 1.66666 9.16675Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2858 13.2858C13.6112 12.9604 14.1388 12.9604 14.4643 13.2858L18.0893 16.9108C18.4147 17.2363 18.4147 17.7639 18.0893 18.0893C17.7638 18.4148 17.2362 18.4148 16.9108 18.0893L13.2858 14.4643C12.9603 14.1389 12.9603 13.6113 13.2858 13.2858Z"
            fill="black"
          />
        </svg>

        <input
          type="text"
          placeholder="Search Project"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-[20px] gap-[8px] font-poppins font-medium text-[14px] leading-[18px] tracking-[0px] placeholder-gray-500 outline-none"
        />
      </div>

      {/* Filter Button */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-[107px] h-[39px] gap-[8px] rounded-[5px] p-[10px] border-[1px] border-[rgba(98,95,109,1)] bg-white flex items-center justify-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.6 1H12.4C13.1333 1 13.7333 1.6 13.7333 2.33333V3.8C13.7333 4.33333 13.4 5 13.0667 5.33333L10.2 7.86667C9.8 8.2 9.53333 8.86667 9.53333 9.4V12.2667C9.53333 12.6667 9.26666 13.2 8.93333 13.4L8 14C7.13333 14.5333 5.93333 13.9333 5.93333 12.8667V9.33333C5.93333 8.86667 5.66666 8.26667 5.4 7.93333L2.86666 5.26667C2.53333 4.93333 2.26666 4.33333 2.26666 3.93333V2.4C2.26666 1.6 2.86666 1 3.6 1Z"
              stroke="#797979"
              strokeWidth="1.3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="font-inter font-medium text-[16px] leading-[19.36px] tracking-[0px] text-[rgba(98,95,109,1)]">
            Filter
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[rgba(98,95,109,1)]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 15.5L6 9.5L7.41 8.09L12 12.67L16.59 8.09L18 9.5L12 15.5Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 rounded-lg shadow-lg z-20">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterClick("all")}
              >
                All
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterClick("todo")}
              >
                To Do
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterClick("in_progress")}
              >
                In Progress
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterClick("done")}
              >
                Completed
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterClick("timeout")}
              >
                Timeout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
