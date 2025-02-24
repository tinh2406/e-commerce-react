import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface OrderSelectProps {
  value: {
    order_by: string | undefined;
    order_type: string | undefined;
  };
  onChange: (value: {
    order_by: string | undefined;
    order_type: string | undefined;
  }) => void;
}

const OrderSelect = ({ value, onChange }: OrderSelectProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative text-left flex">
      <div className="flex items-center gap-2">
        <label className="font-semibold text-lg">Sort by:</label>
        <button
          type="button"
          className="border border-gray-100 rounded-md w-24 px-2 py-1 bg-white inline-flex items-center justify-center"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="mr-2 capitalize">{value.order_by || "Default"}</span>
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
        className="flex items-center"
        onClick={() => {
          onChange({
            order_by: value.order_by,
            order_type: value.order_type === "asc" ? "desc" : "asc",
          });
        }}
      >
        {value.order_type === "asc" ? (
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22l8.5-11h-17L12 22zm0-14c1.1 0 2-.9 2-2V4h-4v2c0 1.1.9 2 2 2z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3.5 13h17L12 2zm0 14c-1.1 0-2 .9-2 2v2h4v-2c0-1.1-.9-2-2-2z" />
          </svg>
        )}
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
            isExpanded && "h-[140px]",
          ])}
        >
          <button
            className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={() => {
              onChange({
                order_by: undefined,
                order_type: value.order_type,
              });
              setIsExpanded(false);
            }}
          >
            <span>Default</span>
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={() => {
              onChange({
                order_by: "name",
                order_type: value.order_type,
              });
              setIsExpanded(false);
            }}
          >
            <span>Name</span>
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={() => {
              onChange({
                order_by: "created_at",
                order_type: value.order_type,
              });
              setIsExpanded(false);
            }}
          >
            <span>Created at</span>
          </button>
          <button
            className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={() => {
              onChange({
                order_by: "deleted_at",
                order_type: value.order_type,
              });
              setIsExpanded(false);
            }}
          >
            <span>Deleted at</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSelect;
