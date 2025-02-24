import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <>
      <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5 mr-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <a
                    href="#"
                    className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                  >
                    Users
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span
                    className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                    aria-current="page"
                  >
                    Settings
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            User settings
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 px-4 xl:grid-cols-2 xl:gap-4">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
          <div className="flow-root">
            <h3 className="text-xl font-semibold dark:text-white">
              Alerts & Notifications
            </h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              You can set up Themesberg to get notifications
            </p>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Company News
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get Themesberg news, announcements, and product updates
                  </div>
                </div>
                <label
                  htmlFor="company-news"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="company-news"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Account Activity
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get important notifications about you or activity you've
                    missed
                  </div>
                </div>
                <label
                  htmlFor="account-activity"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="account-activity"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Meetups Near You
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get an email when a Dribbble Meetup is posted close to my
                    location
                  </div>
                </div>
                <label
                  htmlFor="meetups"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="meetups"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    New Messages
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Get Themsberg news, announcements, and product updates
                  </div>
                </div>
                <label
                  htmlFor="new-messages"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="new-messages"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Save all
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
          <div className="flow-root">
            <h3 className="text-xl font-semibold dark:text-white">
              Email Notifications
            </h3>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              You can set up Themesberg to get email notifications
            </p>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Rating reminders
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Send an email reminding me to rate an item a week after
                    purchase
                  </div>
                </div>
                <label
                  htmlFor="rating-reminders"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="rating-reminders"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Item update notifications
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Send user and product notifications for you
                  </div>
                </div>
                <label
                  htmlFor="item-update"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="item-update"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Item comment notifications
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Send me an email when someone comments on one of my items
                  </div>
                </div>
                <label
                  htmlFor="item-comment"
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="item-comment"
                    className="sr-only"
                  />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="flex flex-col flex-grow">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    Buyer review notifications
                  </div>
                  <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Send me an email when someone leaves a review with their
                    rating
                  </div>
                </div>
                <label
                  htmlFor="buyer-rev"
                  className="relative flex items-center cursor-pointer"
                >
                  <input type="checkbox" id="buyer-rev" className="sr-only" />
                  <span className="h-6 bg-gray-200 border border-gray-200 rounded-full w-11 toggle-bg dark:bg-gray-700 dark:border-gray-600"></span>
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Save all
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
