import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ProductMapper as ProductMapperType } from "../../services/types";
import { useProductMapper } from "../../hooks/useProductMapper";

const ProductMapperCard = ({
  productMapper: __productMapper,
}: {
  productMapper: ProductMapperType;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productMapper, setProductMapper] = useState<ProductMapperType>({
    ...__productMapper,
  });

  const productMapperStore = useProductMapper();

  const handleUpdate = async () => {
    if (
      !productMapper.name ||
      !productMapper.product_id ||
      !productMapper.product_description ||
      !productMapper.product_price ||
      !productMapper.product_hot_price ||
      !productMapper.product_thumbnail ||
      !productMapper.product_category_id ||
      !productMapper.product_category_name ||
      !productMapper.product_images ||
      !productMapper.product_images_name ||
      !productMapper.attributes ||
      !productMapper.attribute_code ||
      !productMapper.attribute_name ||
      !productMapper.attribute_values ||
      !productMapper.attribute_value_name ||
      !productMapper.variants ||
      !productMapper.variant_price ||
      !productMapper.variant_hot_price ||
      !productMapper.variant_image
    )
      return;

    try {
      await productMapperStore.update(productMapper.id, productMapper);
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    productMapperStore.delete(productMapper.id);
  };

  return (
    <div className="bg-white shadow rounded-md flex flex-col gap-2 p-4">
      <div className="text-2xl font-semibold flex justify-between">
        <div>
          {isEdit ? (
            <input
              className="text-2xl font-semibold border border-gray-300 rounded-md p-1 w-80"
              value={productMapper.name}
              onChange={(e) =>
                setProductMapper({
                  ...productMapper,
                  name: e.target.value,
                })
              }
            />
          ) : (
            <div className="p-1 border border-white">{productMapper.name}</div>
          )}
          {productMapper.deleted_at && (
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
                {productMapper.deleted_at ? (
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
        <div>{productMapper.id}</div>
      </div>
      <div className="flex justify-between">
        <div>Created at</div>
        <div>{new Date(productMapper.created_at).toLocaleString()}</div>
      </div>
      <div className="flex justify-between">
        <div>Updated at</div>
        <div>
          {productMapper.updated_at
            ? new Date(productMapper.updated_at).toLocaleString()
            : "N/A"}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Deleted at</div>
        <div>
          {productMapper.deleted_at
            ? new Date(productMapper.deleted_at).toLocaleString()
            : "N/A"}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="font-semibold">Product id</div>
        <input
          value={productMapper.product_id}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-80",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductMapper({ ...productMapper, product_id: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Product name</div>
        <input
          value={productMapper.product_name}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-80",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductMapper({ ...productMapper, product_name: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Product description</div>
        <input
          value={productMapper.product_description}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-80",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductMapper({
              ...productMapper,
              product_description: e.target.value,
            })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Product price</div>
        <input
          value={productMapper.product_price}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-80",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductMapper({
              ...productMapper,
              product_price: e.target.value,
            })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Product hot price</div>
        <input
          value={productMapper.product_hot_price}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-80",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductMapper({
              ...productMapper,
              product_hot_price: e.target.value,
            })
          }
        />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">Product thumbnail</div>
        <input
          value={productMapper.product_thumbnail}
          className={twMerge([
            "text-right  border border-gray-300 rounded-md p-1 w-80",
            !isEdit ? "bg-gray-100" : "bg-white",
          ])}
          disabled={!isEdit}
          onChange={(e) =>
            setProductMapper({
              ...productMapper,
              product_thumbnail: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Product category</div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Category Id</div>
          <input
            value={productMapper.product_category_id}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                product_category_id: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Category name</div>
          <input
            value={productMapper.product_category_name}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                product_category_name: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="font-semibold">Product images</div>
          <input
            value={productMapper.product_images}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                product_thumbnail: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Image key</div>
          <input
            value={productMapper.product_images_name}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                product_images_name: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="font-semibold">Product attributes</div>
          <input
            value={productMapper.attributes}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                attributes: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Attribute code</div>
          <input
            value={productMapper.attribute_code}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                attribute_code: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Attribute name</div>
          <input
            value={productMapper.attribute_name}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                attribute_name: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Attribute values</div>
          <input
            value={productMapper.attribute_values}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                attribute_values: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Value name</div>
          <input
            value={productMapper.attribute_value_name}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                attribute_value_name: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="font-semibold">Product variants</div>
          <input
            value={productMapper.variants}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                variants: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Variant price</div>
          <input
            value={productMapper.variant_price}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                variant_price: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Variant hot price</div>
          <input
            value={productMapper.variant_hot_price}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                variant_hot_price: e.target.value,
              })
            }
          />
        </div>
        <div className="ml-20 flex justify-between">
          <div className="font-semibold">Variant image</div>
          <input
            value={productMapper.variant_image}
            className={twMerge([
              "text-right  border border-gray-300 rounded-md p-1 w-80",
              !isEdit ? "bg-gray-100" : "bg-white",
            ])}
            disabled={!isEdit}
            onChange={(e) =>
              setProductMapper({
                ...productMapper,
                variant_image: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductMapperCard;
