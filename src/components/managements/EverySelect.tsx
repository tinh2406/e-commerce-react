import { useState } from "react";
import { twMerge } from "tailwind-merge";

type e = "minute" | "hour" | "day" | "month" | "year";
const Every: Record<e, e> = {
  minute: "minute",
  hour: "hour",
  day: "day",
  month: "month",
  year: "year",
};

interface EverySelectProps {
  value: string | undefined;
  setValue: (value: e | undefined) => void;
  className?: string;
}

const EverySelect = ({ value, setValue, className }: EverySelectProps) => {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div
      className={twMerge([className, "relative text-start"])}
      onClick={() => setIsExpand(!isExpand)}
    >
      <div className="h-5">{value ? [value] : "Null"}</div>
      {value && (
        <button
          onClick={() => setValue(undefined)}
          className="absolute right-2 top-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <div
        className={twMerge([
          "absolute right-0 left-0 top-10 overflow-hidden h-0 bg-white border-gray-200 rounded-md shadow-lg z-20 dark:bg-gray-800",
          isExpand && "h-fit",
        ])}
      >
        <div
          className={twMerge([
            "transition-all h-0 p-2 flex flex-col gap-2 w-full overflow-y-auto",
            isExpand && "h-[120px]",
          ])}
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {Object.keys(Every).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setValue(key as e);
                setIsExpand(false);
              }}
              className="px-2 py-1 hover:bg-gray-200/90 w-full text-start rounded-md"
            >
              {Every[key as e]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EverySelect;
