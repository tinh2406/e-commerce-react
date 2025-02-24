import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ProductMapperCreate } from "../../services/types";
import { insertNestedPath, splitPathWithDefault } from "../../utils";
import ReactJson from "react-json-view";
import { useProductMapper } from "../../hooks/useProductMapper";

interface AddProductMapperProps {
  isCreateProductMapperOpen: boolean;
  setIsCreateProductMapperOpen: (value: boolean) => void;
}
const AddProductMapper = ({
  isCreateProductMapperOpen,
  setIsCreateProductMapperOpen,
}: AddProductMapperProps) => {
  const [productMapper, setProductMapper] = useState<ProductMapperCreate>({
    name: "mapper",
    product_id: "id",
    product_name: "name",
    product_description: "description",
    product_price: "price",
    product_hot_price: "discount-price",
    product_created_at: "",
    product_deleted_at: "",
    product_thumbnail: "thumbnail_url",
    product_category_id: "categories/id",
    product_category_name: "categories/name",
    product_images: "images",
    product_images_name: "",
    attributes: "configurable_options",
    attribute_code: "code",
    attribute_name: "name",
    attribute_values: "values",
    attribute_value_name: "label",
    variants: "configurable_products",
    variant_price: "original_price",
    variant_hot_price: "price",
    variant_image: "thumbnail_url",
  });

  const preview = useMemo(() => {
    // Khởi tạo đối tượng kết quả và đối tượng lưu trữ đường dẫn "id"
    let resultObject = {};

    let product_idPath = splitPathWithDefault(productMapper.product_id, "id");
    let product_namePath = splitPathWithDefault(
      productMapper.product_name,
      "name"
    );
    let product_descriptionPath = splitPathWithDefault(
      productMapper.product_description,
      "description"
    );
    let product_pricePath = splitPathWithDefault(
      productMapper.product_price,
      100
    );
    let product_hot_pricePath = splitPathWithDefault(
      productMapper.product_hot_price,
      100
    );
    let product_created_atPath = splitPathWithDefault(
      productMapper.product_created_at,
      "11-11-2024"
    );
    let product_deleted_atPath = splitPathWithDefault(
      productMapper.product_deleted_at,
      "11-11-2024"
    );
    let product_thumbnailPath = splitPathWithDefault(
      productMapper.product_thumbnail,
      "thumbnail"
    );
    let product_category_idPath = splitPathWithDefault(
      productMapper.product_category_id,
      "category_id"
    );
    let product_category_namePath = splitPathWithDefault(
      productMapper.product_category_name,
      "category_name"
    );
    let product_images_namePath = splitPathWithDefault(
      productMapper.product_images_name,
      "images"
    );
    let product_image_obj = {};
    insertNestedPath(product_images_namePath, product_image_obj);
    let product_imagesPath = splitPathWithDefault(
      productMapper.product_images,
      [
        Object.keys(product_image_obj).length
          ? { ...product_image_obj }
          : "image_url",
      ]
    );

    let attribute_codePath = splitPathWithDefault(
      productMapper.attribute_code,
      "code"
    );
    let attribute_namePath = splitPathWithDefault(
      productMapper.attribute_name,
      "name"
    );
    let codeObj = {};
    insertNestedPath(attribute_codePath, codeObj);
    let nameObj = {};
    insertNestedPath(attribute_namePath, nameObj);

    let attribute_value_namePath = splitPathWithDefault(
      productMapper.attribute_value_name,
      "value"
    );
    let valueNameObj = {};
    insertNestedPath(attribute_value_namePath, valueNameObj);

    let attribute_valuesPath = splitPathWithDefault(
      productMapper.attribute_values,
      [
        Object.keys(valueNameObj).length > 0
          ? {
              ...valueNameObj,
            }
          : "value",
      ]
    );
    let valuesObj = {};
    insertNestedPath(attribute_valuesPath, valuesObj);
    let attributesPath = splitPathWithDefault(productMapper.attributes, [
      {
        ...codeObj,
        ...nameObj,
        ...valuesObj,
      },
    ]);

    let variant_pricePath = splitPathWithDefault(
      productMapper.variant_price,
      "price"
    );
    let variant_hot_pricePath = splitPathWithDefault(
      productMapper.variant_hot_price,
      "hot price"
    );
    let variant_imagePath = splitPathWithDefault(
      productMapper.variant_image,
      "image"
    );
    let priceObject = {};
    insertNestedPath(variant_pricePath, priceObject);
    let hotPriceObject = {};
    insertNestedPath(variant_hot_pricePath, hotPriceObject);
    let imageObject = {};
    insertNestedPath(variant_imagePath, imageObject);

    let variantsPath = splitPathWithDefault(productMapper.variants, [
      { ...priceObject, ...hotPriceObject, ...imageObject },
    ]);

    insertNestedPath(product_idPath, resultObject);
    insertNestedPath(product_namePath, resultObject);
    insertNestedPath(product_descriptionPath, resultObject);
    insertNestedPath(product_pricePath, resultObject);
    insertNestedPath(product_hot_pricePath, resultObject);
    insertNestedPath(product_created_atPath, resultObject);
    insertNestedPath(product_deleted_atPath, resultObject);
    insertNestedPath(product_thumbnailPath, resultObject);
    insertNestedPath(product_category_idPath, resultObject);
    insertNestedPath(product_category_namePath, resultObject);
    insertNestedPath(product_imagesPath, resultObject);
    insertNestedPath(attributesPath, resultObject);
    insertNestedPath(variantsPath, resultObject);

    return resultObject;
  }, [productMapper]);

  const productMapperStore = useProductMapper();

  const handleAddProductMapper = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await productMapperStore.add(productMapper);
    setIsCreateProductMapperOpen(false);
  };

  return (
    <>
      <div
        id="drawer-create-product-default"
        style={{
          scrollbarWidth: "none",
        }}
        className={twMerge([
          `fixed top-0 right-0 z-50 w-full h-svh overflow-hidden max-w-4xl p-4 
      transition-transform bg-white dark:bg-gray-800 grid grid-cols-7`,
          isCreateProductMapperOpen ? "translate-x-0" : "translate-x-full",
        ])}
        tabIndex={-1}
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <div
          className="col-span-2 h-[calc(100%-120px)] overflow-y-scroll"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div className="font-semibold ">Source product like</div>
          <ReactJson name="Preview" src={preview} />
        </div>
        <div className="col-span-5 ">
          <h5
            id="drawer-label"
            className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            New mapper
          </h5>
          <button
            type="button"
            onClick={() => setIsCreateProductMapperOpen(false)}
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
            className="h-[calc(100%-180px)] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
            }}
            onSubmit={handleAddProductMapper}
          >
            <div className="gap-4 grid grid-cols-1">
              <div className="flex justify-between">
                <div className="">Mapper name</div>
                <input
                  value={productMapper.name}
                  placeholder="Mapper name"
                  className={twMerge([
                    "text-right  border border-gray-300 rounded-md p-1 w-80",
                  ])}
                  onChange={(e) =>
                    setProductMapper({
                      ...productMapper,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Product id</div>
                <input
                  value={productMapper.product_id}
                  placeholder="Source product id"
                  required
                  className={twMerge([
                    "text-right  border border-gray-300 rounded-md p-1 w-80",
                  ])}
                  onChange={(e) =>
                    setProductMapper({
                      ...productMapper,
                      product_id: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Product name</div>
                <input
                  value={productMapper.product_name}
                  required
                  placeholder="Source product name"
                  className={twMerge([
                    "text-right  border border-gray-300 rounded-md p-1 w-80",
                  ])}
                  onChange={(e) =>
                    setProductMapper({
                      ...productMapper,
                      product_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Product description</div>
                <input
                  value={productMapper.product_description}
                  required
                  placeholder="Source product description"
                  className={twMerge([
                    "text-right  border border-gray-300 rounded-md p-1 w-80",
                  ])}
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
                  required
                  value={productMapper.product_price}
                  placeholder="Source product price"
                  className={twMerge([
                    "text-right  border border-gray-300 rounded-md p-1 w-80",
                  ])}
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
                  placeholder="Source product hot price"
                  className={twMerge([
                    "text-right  border border-gray-300 rounded-md p-1 w-80",
                  ])}
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
                  required
                  placeholder="Source product thumbnail"
                  className={twMerge([
                    "text-right  border border-gray-300 rounded-md p-1 w-80",
                  ])}
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
                    required
                    placeholder="Source product category id"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    required
                    placeholder="Source product category name"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    required
                    placeholder="Source product images"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
                    onChange={(e) =>
                      setProductMapper({
                        ...productMapper,
                        product_images: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="ml-20 flex justify-between">
                  <div className="font-semibold">Image key</div>
                  <input
                    value={productMapper.product_images_name}
                    placeholder="Source product images name"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    placeholder="Source product attributes"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    placeholder="Source attribute code"
                    required
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    placeholder="Source attribute name"
                    required
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    required
                    placeholder="Source attribute values"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    required
                    placeholder="Source attribute value name"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    placeholder="Source product variants"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    required
                    placeholder="Source variant price"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    placeholder="Source variant hot price"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
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
                    placeholder="Source variant image"
                    className={twMerge([
                      "text-right  border border-gray-300 rounded-md p-1 w-80",
                    ])}
                    onChange={(e) =>
                      setProductMapper({
                        ...productMapper,
                        variant_image: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
                <button
                  type="submit"
                  className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add mapper
                </button>
                <button
                  type="button"
                  data-drawer-dismiss="drawer-create-product-default"
                  onClick={() => setIsCreateProductMapperOpen(false)}
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
          </form>
        </div>
      </div>
      {isCreateProductMapperOpen && (
        <div
          className="fixed bg-black/20 top-0 left-0 right-0 bottom-0 z-20"
          onClick={() => {
            setIsCreateProductMapperOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default AddProductMapper;
