import { twMerge } from "tailwind-merge";
import CategorySelect from "./CategorySelect";
import { useState } from "react";
import { CategoryCreate } from "../../services/types";
import { useCategory } from "../../hooks/useCategory";

interface AddCategoryProps {
  isCreateCategoryOpen: boolean;
  setIsCreateCategoryOpen: (value: boolean) => void;
}
const AddCategory = ({
  isCreateCategoryOpen,
  setIsCreateCategoryOpen,
}: AddCategoryProps) => {
  const [category, setCategory] = useState<CategoryCreate>({
    name: "Category 1",
    parent_id: "25966637-3b46-45e2-af32-7431ab5ca696",
  });

  const categoryStore = useCategory();

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category.name) {
      await categoryStore.add(category);
      setIsCreateCategoryOpen(false);
    }
  };

  return (
    <>
      <div
        id="drawer-create-category-default"
        style={{
          scrollbarWidth: "none",
        }}
        className={twMerge([
          `fixed top-0 right-0 z-50 w-full h-screen max-w-sm p-4 overflow-y-auto
      transition-transform bg-white dark:bg-gray-800`,
          isCreateCategoryOpen ? "translate-x-0" : "translate-x-full",
        ])}
        tabIndex={-1}
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          New Category
        </h5>
        <button
          type="button"
          onClick={() => setIsCreateCategoryOpen(false)}
          data-drawer-dismiss="drawer-create-category-default"
          aria-controls="drawer-create-category-default"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <form
          className="h-[calc(100%-100px)] overflow-y-auto"
          style={{
            scrollbarWidth: "none",
          }}
          onSubmit={handleAddCategory}
        >
          <div className="gap-4 grid grid-cols-1">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="title"
                value={category.name}
                onChange={(e) => {
                  setCategory({ ...category, name: e.target.value });
                }}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type category name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Parent Category
              </label>
              <CategorySelect
                value={category.parent_id}
                setValue={(value) => {
                  setCategory({ ...category, parent_id: value });
                }}
              />
            </div>
            <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
              <button
                type="submit"
                className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add category
              </button>
              <button
                type="button"
                data-drawer-dismiss="drawer-create-category-default"
                onClick={() => setIsCreateCategoryOpen(false)}
                aria-controls="drawer-create-category-default"
                className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 -ml-1 sm:mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      {isCreateCategoryOpen && (
        <div
          className="fixed bg-black/20 top-0 left-0 right-0 bottom-0 z-20"
          onClick={() => {
            setIsCreateCategoryOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default AddCategory;
