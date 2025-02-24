import { twMerge } from "tailwind-merge";
import CategorySelect from "./CategorySelect";
import { useEffect, useState } from "react";
import { ProductCreate } from "../../services/types";
import AddAttribute from "./AddAttribute";
import AddVariants from "./AddVariant";
import { GetProductDetailService } from "../../services/products.service";
import { useProduct } from "../../hooks/useProduct";

interface UpdateProductProps {
  productId: string | undefined;
  setProductId: (productId: string | undefined) => void;
}

const UpdateProduct = ({ productId, setProductId }: UpdateProductProps) => {
  const [product, setProduct] = useState<ProductCreate>({
    name: "",
    price: 0,
    hot_price: 0,
    category_id: "",
    description: "",
    thumbnail: "",
    images: [],
    attributes: [],
    variants: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const product = await GetProductDetailService(productId);

        setProduct({
          name: product.name,
          price: product.price,
          hot_price: product.hot_price,
          category_id: product.category_id,
          description: product.description,
          thumbnail: product.thumbnail,
          images: product.images,
          attributes: Object.keys(product.attributes || {}).map(
            (attribute) => ({
              name: attribute,
              values: product.attributes?.[attribute] || [],
            })
          ),
          variants: product.variants?.map((variant) => ({
            price: variant.price,
            hot_price: variant.hot_price,
            image: variant.image,
            ...variant.attributes,
          })),
        });
      } catch (error) {}
      setLoading(false);
    };
    fetch();
  }, [productId]);

  const productStore = useProduct();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productId) return;
    await productStore.update(productId, product);
    setProductId(undefined);
  };

  return (
    <>
      <div
        id="drawer-update-product-default"
        className={twMerge([
          `fixed top-0 right-0 z-40 w-full h-screen max-w-2xl p-4 
            overflow-y-auto transition-transform translate-x-full bg-white dark:bg-gray-800`,
          productId && "translate-x-0",
        ])}
        tabIndex={-1}
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Update Product
        </h5>
        <button
          type="button"
          onClick={() => setProductId(undefined)}
          data-drawer-dismiss="drawer-update-product-default"
          aria-controls="drawer-update-product-default"
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
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <form
            className="h-[calc(100%-100px)] overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
            onSubmit={handleSubmit}
          >
            <div className="gap-4 grid grid-cols-2">
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
                  id="name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={product.price || ""}
                  onChange={(e) =>
                    setProduct({ ...product, price: Number(e.target.value) })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="đ2999"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="discount-price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Discount price
                </label>
                <input
                  type="number"
                  name="discount-price"
                  value={product.hot_price || ""}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setProduct({ ...product, hot_price: undefined });
                      return;
                    }
                    if (isNaN(Number(e.target.value))) {
                      setProduct({ ...product });
                      return;
                    }
                    setProduct({
                      ...product,
                      hot_price: Number(e.target.value),
                    });
                  }}
                  id="discount-price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="đ2999"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category-create"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <CategorySelect
                  value={product.category_id}
                  setValue={(value) => {
                    setProduct({ ...product, category_id: value });
                  }}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={product.description}
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                  }}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter event description here"
                ></textarea>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="images"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Images
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt="thumbnail"
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-gray-200 rounded-lg flex justify-center items-center">
                        <svg
                          className="w-28 h-28 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="image"
                        className="aspect-square object-cover rounded-lg"
                      />
                    ))}
                    {(product.thumbnail || !!product.images?.length) && (
                      <div className="aspect-square bg-gray-200 rounded-lg flex justify-center items-center">
                        <svg
                          className="w-full h-full text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-col col-span-2 gap-2">
                <label
                  htmlFor="attributes"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Attributes
                </label>

                <AddAttribute
                  attributes={product.attributes}
                  setAttributes={(attributes) => {
                    setProduct({ ...product, attributes });
                  }}
                />
              </div>
              <div className="flex-col gap-2 col-span-2">
                <label
                  htmlFor="variants"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Variants
                </label>

                <AddVariants
                  attributes={product.attributes}
                  variants={product.variants}
                  setVariants={(variants) => {
                    setProduct({ ...product, variants });
                  }}
                />
              </div>
            </div>
            <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
              <button
                type="submit"
                className="w-full justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update
              </button>
              <button
                type="button"
                className="w-full justify-center text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-1 -ml-1"
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
                Discard
              </button>
            </div>
          </form>
        )}
      </div>
      {productId && (
        <div
          className="fixed bg-black/20 top-0 left-0 right-0 bottom-0 z-20"
          onClick={() => {
            setProductId(undefined);
          }}
        ></div>
      )}
    </>
  );
};

export default UpdateProduct;
