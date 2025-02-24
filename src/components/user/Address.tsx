import { useAddress } from "../../hooks/useAddress";

const Address = () => {
  const addressStore = useAddress();
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="flex justify-between">
        <h3 className="mb-4 text-xl font-semibold dark:text-white">Address</h3>
        <button
          type="button"
          className="p-2 rounded-md font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          onClick={() => addressStore.setIsOpen(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="4" width="4" height="16" fill="black" />
            <rect x="4" y="10" width="16" height="4" fill="black" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {addressStore.data?.map((address) => (
          <div key={address.id} className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold dark:text-white">
                {address.city_detail}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-primary-600 dark:text-primary-400"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {address.district_detail}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {address.ward_detail}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {address.detail}
            </div>
          </div>
        ))}
      </div>
      {addressStore.isOpen && (
        <div
          className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-black/10 z-50"
          onClick={() => addressStore.setIsOpen(false)}
        >
          <div className="bg-white rounded-md shadow"></div>
        </div>
      )}
    </div>
  );
};

export default Address;
