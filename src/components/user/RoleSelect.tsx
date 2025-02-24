import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Roles: Record<string, string> = {
  "1": "Admin",
  "2": "Staff",
  "3": "Customer",
};

interface RoleSelectProps {
  value: string | undefined;
  setValue: (value: string) => void;
  className?: string;
}

const RoleSelect = ({ value, setValue, className }: RoleSelectProps) => {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div
      className={twMerge([className, "relative text-start"])}
      onClick={() => setIsExpand(!isExpand)}
    >
      <div className="">{value ? Roles[value] : null}</div>
      <div
        className={twMerge([
          "absolute right-0 left-0 top-10 overflow-hidden h-0 bg-white border-gray-200 rounded-md shadow-lg z-20 dark:bg-gray-800",
          isExpand && "h-fit",
        ])}
      >
        <div
          className={twMerge([
            "transition-all h-0 p-2 flex flex-col gap-2 w-full",
            isExpand && "h-[120px]",
          ])}
        >
          {Object.keys(Roles).map((key) => (
            <button
              key={key}
              onClick={() => {
                setValue(key);
                setIsExpand(false);
              }}
              className="px-2 py-1 hover:bg-gray-200/90 w-full text-start rounded-md"
            >
              {Roles[key]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
