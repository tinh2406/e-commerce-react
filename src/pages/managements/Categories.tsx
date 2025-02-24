import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCategory from "../../components/managements/AddCategory";
import DeleteCategory from "../../components/managements/DeleteCategory";
import OrderSelect from "../../components/managements/OrderSelect";
import StatusFilter from "../../components/managements/StatusFilter";
import UpdateCategory from "../../components/managements/UpdateCategory";
import { useCategory } from "../../hooks/useCategory";
import { GetCategoryDetailService } from "../../services/categories.service";
import { Category } from "../../services/types";

const CategoryRow = ({ category }: { category: Category }) => {
  const createdAt = new Date(category.created_at);
  const deletedAt = category.deleted_at ? new Date(category.deleted_at) : null;

  const [parent, setParent] = useState<Category | null>(null);
  useEffect(() => {
    if (category.parent_id) {
      GetCategoryDetailService(category.parent_id).then((res) => {
        setParent(res);
      });
    } else {
      setParent(null);
    }
  }, [category.parent_id]);

  return (
    <>
      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        <div
          className="text-base font-semibold text-gray-900 dark:text-white w-80 overflow-x-auto"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {category.name}
        </div>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap truncate xl:max-w-32 dark:text-white">
        {category.id}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap truncate xl:max-w-32 dark:text-white">
        <div
          className="text-base  text-gray-900 dark:text-white w-80 overflow-x-auto"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {category.parent_id || "N/A"}
        </div>
        <div
          className="text-base  text-gray-900 dark:text-white w-80 overflow-x-auto"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {parent?.name}
        </div>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {createdAt.toLocaleString()}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {deletedAt?.toLocaleString()}
      </td>
    </>
  );
};

const Categories = () => {
  const categoryStore = useCategory();

  const goPrevious = () => {
    if (categoryStore.page <= 1) {
      return;
    }
    categoryStore.setPage(categoryStore.page - 1);
  };
  const goNext = () => {
    if (
      categoryStore.page_count &&
      categoryStore.page < categoryStore.page_count
    ) {
      categoryStore.setPage(categoryStore.page + 1);
    }
  };

  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [updatedId, setUpdatedId] = useState<string>();
  const [deletedId, setDeletedId] = useState<string>();

  const [search, setSearch] = useState("");
  const keyword = useDebounce(search, 500);
  useEffect(() => {
    const k = categoryStore.query.keyword || "";

    if (keyword != k) {
      categoryStore.setQuery({
        keyword: keyword || undefined,
      });
    }
  }, [keyword]);

  return (
    <main>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                <li className="inline-flex items-center">
                  <Link
                    to={"/"}
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
                    <Link
                      to={"/management"}
                      className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                    >
                      E-commerce
                    </Link>
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
                      Categories
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              All categories
            </h1>
          </div>
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="flex items-center w-full sm:justify-end gap-4">
                <div className="flex pl-2 space-x-1 justify-center items-center">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="categories-search"
                    className="bg-gray-50 w-96 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for categories"
                  />
                </div>
                <StatusFilter
                  value={categoryStore.query.is_deleted}
                  onChange={(value) => {
                    categoryStore.setQuery({
                      is_deleted: value,
                    });
                  }}
                />
                <OrderSelect
                  onChange={(value) => {
                    categoryStore.setQuery({
                      order_by: value.order_by,
                      order_type: value.order_type,
                    });
                  }}
                  value={{
                    order_by: categoryStore.query.order_by,
                    order_type: categoryStore.query.order_type,
                  }}
                />
              </div>
            </div>
            <button
              id="createCategoryButton"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              type="button"
              data-drawer-target="drawer-create-category-default"
              data-drawer-show="drawer-create-category-default"
              aria-controls="drawer-create-category-default"
              data-drawer-placement="right"
              onClick={() => setIsCreateCategoryOpen(true)}
            >
              Add new category
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Parent
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Deleted at
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {categoryStore.data.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <CategoryRow category={category} />

                      <td className="p-4 space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setUpdatedId(category.id)}
                          id="updateCategoryButton"
                          data-drawer-target="drawer-update-category-default"
                          data-drawer-show="drawer-update-category-default"
                          aria-controls="drawer-update-category-default"
                          data-drawer-placement="right"
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                            <path
                              fillRule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletedId(category.id)}
                          id="deleteCategoryButton"
                          data-drawer-target="drawer-delete-category-default"
                          data-drawer-show="drawer-delete-category-default"
                          aria-controls="drawer-delete-category-default"
                          data-drawer-placement="right"
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <button
            onClick={goPrevious}
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
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
          </button>
          <button
            onClick={goNext}
            className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
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
          </button>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {categoryStore.page_size * (categoryStore.page - 1) + 1}-
              {categoryStore.page_size * categoryStore.page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {categoryStore.item_count}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={goPrevious}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="w-5 h-5 mr-1 -ml-1"
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
            Previous
          </button>
          <button
            onClick={goNext}
            className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Next
            <svg
              className="w-5 h-5 ml-1 -mr-1"
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
          </button>
        </div>
      </div>
      <UpdateCategory categoryId={updatedId} setCategoryId={setUpdatedId} />
      <DeleteCategory categoryId={deletedId} setCategoryId={setDeletedId} />
      <AddCategory
        isCreateCategoryOpen={isCreateCategoryOpen}
        setIsCreateCategoryOpen={setIsCreateCategoryOpen}
      />
    </main>
  );
};

export default Categories;
