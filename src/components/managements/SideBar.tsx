import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const SideBar = () => {
  const { pathname } = useLocation();

  const [isCRUDOpen, setIsCRUDOpen] = useState(false);

  return (
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-10 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            <ul className="pb-2 space-y-2">
              <li>
                <Link
                  to={"/management"}
                  className={twMerge([
                    `flex items-center p-2 text-base text-gray-900 rounded-lg
                     hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700`,
                    pathname === "/management" &&
                      "bg-gray-100 dark:bg-gray-700",
                  ])}
                >
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"conversations"}
                  className={twMerge([
                    `flex items-center p-2 text-base text-gray-900 rounded-lg
                     hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700`,
                    pathname.includes("conversations") &&
                      "bg-gray-100 dark:bg-gray-700",
                  ])}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                  <span className="ml-3">Conversations</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsCRUDOpen(!isCRUDOpen)}
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  aria-controls="dropdown-crud"
                  data-collapse-toggle="dropdown-crud"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M.99 5.24A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25l.01 9.5A2.25 2.25 0 0116.76 17H3.26A2.267 2.267 0 011 14.74l-.01-9.5zm8.26 9.52v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 00.627-.74zm1.5 0a.75.75 0 00.627.74h5.373a.75.75 0 00.75-.75v-.615a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625zm6.75-3.63v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75zM17.5 7.5v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75z"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    CRUD
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                {(isCRUDOpen ||
                  pathname.includes("categories") ||
                  pathname.includes("products") ||
                  pathname.includes("users")) && (
                  <ul id="dropdown-crud" className="space-y-2 py-2 ">
                    <Link
                      to={"categories"}
                      className={twMerge([
                        `text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 
                        transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700`,
                        pathname.includes("categories") &&
                          "bg-gray-100 dark:bg-gray-700",
                      ])}
                    >
                      Categories
                    </Link>
                    <Link
                      to="products"
                      className={twMerge([
                        `text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 
                        transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700`,
                        pathname.includes("products") &&
                          "bg-gray-100 dark:bg-gray-700",
                      ])}
                    >
                      Products
                    </Link>
                    <Link
                      to="users"
                      className={twMerge([
                        `text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 
                        transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700`,
                        pathname.includes("users") &&
                          "bg-gray-100 dark:bg-gray-700",
                      ])}
                    >
                      Users
                    </Link>
                  </ul>
                )}
              </li>
              <li className="flex flex-col gap-2">
                <Link
                  to={"/management/settings"}
                  className={twMerge([
                    `flex items-center p-2 text-base text-gray-900 rounded-lg
                     hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700`,
                  ])}
                >
                  <svg
                    className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span className="ml-3">Settings</span>
                </Link>
                {pathname.includes("/settings") && (
                  <ul id="dropdown-crud" className="space-y-2 py-2">
                    <Link
                      to={"/management/settings"}
                      className={twMerge([
                        `flex items-center p-2 text-base text-gray-900 rounded-lg pl-10
                           hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700`,
                        pathname === "/management/settings" &&
                          "bg-gray-100 dark:bg-gray-700",
                      ])}
                    >
                      Crawler settings
                    </Link>
                    <Link
                      to="/management/settings/details-mappers"
                      className={twMerge([
                        `flex items-center p-2 text-base text-gray-900 rounded-lg pl-10
                           hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700`,
                        pathname === "/management/settings/details-mappers" &&
                          "bg-gray-100 dark:bg-gray-700",
                      ])}
                    >
                      Products mappers
                    </Link>
                    <Link
                      to="/management/settings/product-mappers"
                      className={twMerge([
                        `flex items-center p-2 text-base text-gray-900 rounded-lg pl-10
                           hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700`,
                        pathname === "/management/settings/product-mappers" &&
                          "bg-gray-100 dark:bg-gray-700",
                      ])}
                    >
                      Product mappers
                    </Link>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
