import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ProductsMapper as ProductsMapperType } from "../../services/types";
import { useProductsMapper } from "../../hooks/useProductsMapper";

const ProductsMapperCard = ({
  productsMapper: _productsMapper,
}: {
  productsMapper: ProductsMapperType;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productsMapper, setProductsMapper] = useState<ProductsMapperType>({
    id: _productsMapper.id,
    name: _productsMapper.name,
    created_at: _productsMapper.created_at,
    updated_at: _productsMapper.updated_at,
    deleted_at: _productsMapper.deleted_at,
    data: _productsMapper.data,
    page: _productsMapper.page,
    take: _productsMapper.take,
    total: _productsMapper.total,
    total_page: _productsMapper.total_page,
    primary_key: _productsMapper.primary_key,
  });

  const productsMapperStore = useProductsMapper();

  const handleUpdate = async () => {
    if (
      !productsMapper.name ||
      !productsMapper.data ||
      !productsMapper.page ||
      !productsMapper.take ||
      !productsMapper.total ||
      !productsMapper.total_page ||
      !productsMapper.primary_key
    )
      return;

    try {
      await productsMapperStore.update(productsMapper.id, productsMapper);
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    productsMapperStore.delete(productsMapper.id);
  };

  return (
    <div className="bg-white shadow rounded-md flex flex-col gap-2 p-4">
      <div className="text-2xl font-semibold flex justify-between">
        <div>
          {isEdit ? (
            <input
              className="text-2xl font-semibold border border-gray-300 rounded-md p-1 w-80"
              value={productsMapper.name}
              onChange={(e) =>
                setProductsMapper({
                  ...productsMapper,
                  name: e.target.value,
                })
              }
            />
          ) : (
            <div className="p-1 border border-white">{productsMapper.name}</div>
          )}
          {productsMapper.deleted_at && (
            <span className="px-2 py-1 rounded-md bg-red-500">Deleted</span>
          )}
        </div>
        <div className="relative">
          <button
            className=" hover:bg-gray-200 p-2 rounded-md"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="6" r="2" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="18" r="2" fill="currentColor" />
            </svg>
          </button>

          {isExpanded && (
            <>
              <div
                className="fixed top-0 left-0 right-0 bottom-0 z-50"
                onClick={() => {
                  setIsExpanded(false);
                }}
              ></div>
              <div className="absolute right-0 w-40 z-50 rounded-md h-32 p-2 bg-white shadow">
                <button
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                  }}
                  className="w-full p-2 text-left text-sm hover:bg-gray-100 rounded-md"
                >
                  View details
                </button>
                {isEdit ? (
                  <button
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setIsExpanded(false);
                      handleUpdate();
                    }}
                    className="w-full p-2 text-left  text-sm hover:bg-gray-100 rounded-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setIsExpanded(false);
                    }}
                    className="w-full p-2 text-left  text-sm hover:bg-gray-100 rounded-md"
                  >
                    Edit
                  </button>
                )}
                {productsMapper.deleted_at ? (
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                    className="w-full p-2 text-left  text-sm hover:bg-gray-100 rounded-md"
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      handleDelete();
                    }}
                    className="w-full p-2 text-left  text-sm hover:bg-gray-100 rounded-md"
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div>ID</div>
        <div>{productsMapper.id}</div>
      </div>
      <div className="flex justify-between">
        <div>Created at</div>
        <div>{new Date(productsMapper.created_at).toLocaleString()}</div>
      </div>
      <div className="flex justify-between">
        <div>Updated at</div>
        <div>
          {productsMapper.updated_at
            ? new Date(productsMapper.updated_at).toLocaleString()
            : "N/A"}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Deleted at</div>
        <div>
          {productsMapper.deleted_at
            ? new Date(productsMapper.deleted_at).toLocaleString()
            : "N/A"}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="font-semibold">Data key</div>
        <input
          value={productsMapper.data}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductsMapper({ ...productsMapper, data: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Page key</div>
        <input
          value={productsMapper.page}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductsMapper({ ...productsMapper, page: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Take key</div>
        <input
          value={productsMapper.take}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductsMapper({ ...productsMapper, take: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Total key</div>
        <input
          value={productsMapper.total}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductsMapper({ ...productsMapper, total: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Total page key</div>
        <input
          value={productsMapper.total_page}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductsMapper({ ...productsMapper, total_page: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">ProductId key</div>
        <input
          value={productsMapper.primary_key}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-40 2xl:w-60",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductsMapper({
              ...productsMapper,
              primary_key: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default ProductsMapperCard;
