import { useMemo, useState } from "react";
import ReactJson from "react-json-view";
import { twMerge } from "tailwind-merge";
import { useProductsMapper } from "../../hooks/useProductsMapper";
import { ProductsMapperCreate } from "../../services/types";
import { insertNestedPath, splitPathWithDefault } from "../../utils";

interface AddProductsMapperProps {
  isCreateProductsMapperOpen: boolean;
  setIsCreateProductsMapperOpen: (value: boolean) => void;
}

const AddProductsMapper = ({
  isCreateProductsMapperOpen,
  setIsCreateProductsMapperOpen,
}: AddProductsMapperProps) => {
  const [productsMapper, setProductsMapper] = useState<ProductsMapperCreate>({
    name: "mapper",
    data: "data",
    primary_key: "id",
    total: "paging/total",
    total_page: "paging/total_page",
    take: "paging/take",
    page: "paging/page",
  });

  const productsMapperStore = useProductsMapper();

  const preview = useMemo(() => {
    // Khởi tạo đối tượng kết quả và đối tượng lưu trữ đường dẫn "id"
    let resultObject = {};
    let idPathObject = {};

    // Sử dụng hàm để thiết lập đường dẫn cho các phần tử dữ liệu
    insertNestedPath(
      splitPathWithDefault(productsMapper.primary_key, "id"),
      idPathObject
    );

    let dataPath = splitPathWithDefault(productsMapper.data, [idPathObject]);
    let pagePath = splitPathWithDefault(productsMapper.page, 3);
    let takePath = splitPathWithDefault(productsMapper.take, 3);
    let totalPath = splitPathWithDefault(productsMapper.total, 3);
    let totalPagePath = splitPathWithDefault(productsMapper.total_page, 3);

    insertNestedPath(dataPath, resultObject);
    insertNestedPath(pagePath, resultObject);
    insertNestedPath(takePath, resultObject);
    insertNestedPath(totalPath, resultObject);
    insertNestedPath(totalPagePath, resultObject);

    return resultObject;
  }, [productsMapper]);

  const handleAddProductsMapper = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await productsMapperStore.add(productsMapper);
    setIsCreateProductsMapperOpen(false);
  };

  return (
    <>
      <div
        id="drawer-create-product-default"
        style={{
          scrollbarWidth: "none",
        }}
        className={twMerge([
          `fixed top-0 right-0 z-50 w-full h-screen max-w-md p-4 overflow-y-auto
      transition-transform bg-white dark:bg-gray-800`,
          isCreateProductsMapperOpen ? "translate-x-0" : "translate-x-full",
        ])}
        tabIndex={-1}
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          New mappers
        </h5>
        <button
          type="button"
          onClick={() => setIsCreateProductsMapperOpen(false)}
          data-drawer-dismiss="drawer-create-product-default"
          aria-controls="drawer-create-product-default"
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
          onSubmit={handleAddProductsMapper}
        >
          <div className="gap-4 grid grid-cols-1">
            <div className="flex justify-between">
              <div className="">Mapper name</div>
              <input
                value={productsMapper.name}
                required
                className={twMerge([
                  "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
                ])}
                onChange={(e) =>
                  setProductsMapper({ ...productsMapper, name: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Data key</div>
              <input
                value={productsMapper.data}
                required
                className={twMerge([
                  "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
                ])}
                onChange={(e) =>
                  setProductsMapper({ ...productsMapper, data: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Page key</div>
              <input
                value={productsMapper.page}
                required
                className={twMerge([
                  "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
                ])}
                onChange={(e) =>
                  setProductsMapper({ ...productsMapper, page: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Take key</div>
              <input
                value={productsMapper.take}
                required
                className={twMerge([
                  "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
                ])}
                onChange={(e) =>
                  setProductsMapper({ ...productsMapper, take: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Total key</div>
              <input
                value={productsMapper.total}
                required
                className={twMerge([
                  "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
                ])}
                onChange={(e) =>
                  setProductsMapper({
                    ...productsMapper,
                    total: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">Total page key</div>
              <input
                value={productsMapper.total_page}
                required
                className={twMerge([
                  "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
                ])}
                onChange={(e) =>
                  setProductsMapper({
                    ...productsMapper,
                    total_page: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-between">
              <div className="font-semibold">ProductId key</div>
              <input
                value={productsMapper.primary_key}
                required
                className={twMerge([
                  "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
                ])}
                onChange={(e) =>
                  setProductsMapper({
                    ...productsMapper,
                    primary_key: e.target.value,
                  })
                }
              />
            </div>
            <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
              <button
                type="submit"
                className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add product
              </button>
              <button
                type="button"
                data-drawer-dismiss="drawer-create-product-default"
                onClick={() => setIsCreateProductsMapperOpen(false)}
                aria-controls="drawer-create-product-default"
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
          <div>
            <ReactJson name="Corresponding to" src={preview} />
          </div>
        </form>
      </div>
      {isCreateProductsMapperOpen && (
        <div
          className="fixed bg-black/20 top-0 left-0 right-0 bottom-0 z-20"
          onClick={() => {
            setIsCreateProductsMapperOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default AddProductsMapper;
