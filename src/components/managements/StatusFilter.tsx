import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface StatusFilterProps {
  value: boolean | undefined;
  onChange: (value: boolean | undefined) => void;
}

const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative text-left flex">
      <div className="flex items-center gap-2">
        <label className="font-semibold text-lg">Status:</label>
        <button
          type="button"
          className="border border-gray-100 rounded-md w-24 px-2 py-1 bg-white inline-flex items-center justify-center"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="mr-2 capitalize">
            {value === false ? "Active" : value === true ? "Deleted" : "All"}
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={twMerge([
          "absolute right-0 mt-8 w-48 h-0 bg-white border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden",
          isExpanded && "h-fit",
        ])}
      >
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          className={twMerge([
            "transition-all h-0 m-2",
            isExpanded && "h-[108px]",
          ])}
        >
          <button
            className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={() => {
              onChange(undefined);
              setIsExpanded(false);
            }}
          >
            <span>All</span>
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={() => {
              onChange(false);
              setIsExpanded(false);
            }}
          >
            <span>Active</span>
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={() => {
              onChange(true);
              setIsExpanded(false);
            }}
          >
            <span>Deleted</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
