import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

const NavbarAvatar = () => {
  const { user } = useAuth();

  const [isExpand, setIsExpand] = useState(false);

  const toggleExpand = () => {
    setIsExpand(!isExpand);
  };

  const authStore = useAuth();

  return (
    <div
      className={`flex gap-2 relative items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 
                hover:text-gray-700 dark:text-gray-200 cursor-pointer px-2 py-1`}
      onClick={toggleExpand}
    >
      <div className="w-8 h-8 rounded-full text-white flex justify-center items-center">
        {!user ? (
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#374151" />

            <circle cx="12" cy="8" r="4" fill="white" />

            <path
              d="M6 20c0-3.3137 2.6863-6 6-6s6 2.6863 6 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : user.image ? (
          <img alt="" src={user.image} />
        ) : (
          <span className="rounded-full w-7 h-7 bg-gray-300 text-center">
            {user.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="text-gray-700 dark:text-gray-400 font-medium relative">
        Account
      </div>
      <div
        className={twMerge([
          "absolute right-0 top-10 overflow-hidden w-48 h-0 bg-white border-gray-200 rounded-md shadow-lg z-20 dark:bg-gray-800",
          isExpand && "h-fit",
        ])}
      >
        {user ? (
          <div
            className={twMerge([
              "transition-all h-0 m-2",
              isExpand && "h-[80px]",
            ])}
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/user"
                className="text-gray-600 hover:text-primary truncate p-2 rounded-md w-full text-left hover:bg-gray-200"
              >
                Profile
              </Link>
              <button className="text-gray-600 hover:text-primary truncate p-2 w-full rounded-md text-left hover:bg-gray-200"
                onClick={()=>{
                  authStore.logout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div
            className={twMerge([
              "transition-all h-0 m-2",
              isExpand && "h-[80px]",
            ])}
          >
            <div className="flex flex-col gap-1">
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary truncate p-2 rounded-md w-full text-left hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-600 hover:text-primary truncate p-2 w-full rounded-md text-left hover:bg-gray-200"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
      <div
        className={twMerge([
          "fixed top-0 left-0 w-full h-full z-10 hidden",
          isExpand && "block",
        ])}
      ></div>
    </div>
  );
};

export default NavbarAvatar;
