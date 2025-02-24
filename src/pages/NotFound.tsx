import { Link, useNavigate } from "react-router-dom";
import { LOGO_URL } from "../services/constants";

export default () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900">
      <div className="block md:max-w-lg">
        <img src={LOGO_URL} width={200} height={200} alt="astronaut image" />
      </div>
      <div className="text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
          Page not found
        </h1>
        <p className="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
          Oops! Looks like you followed a bad link. If you think this is a
          problem with us, please tell us.
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="mr-2 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Go back
          </button>
          <Link
            to={"/"}
            className="text-white flex items-center justify-between bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 11.25L12 3L21 11.25V21C21 21.4142 20.6642 21.75 20.25 21.75H15.75C15.3358 21.75 15 21.4142 15 21V15.75C15 15.3358 14.6642 15 14.25 15H9.75C9.33579 15 9 15.3358 9 15.75V21C9 21.4142 8.66421 21.75 8.25 21.75H3.75C3.33579 21.75 3 21.4142 3 21V11.25Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};
