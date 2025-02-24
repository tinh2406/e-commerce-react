import { twMerge } from "tailwind-merge";
import CategorySelect from "./CategorySelect";
import { useState } from "react";
import { ProductCreate } from "../../services/types";
import AddAttribute from "./AddAttribute";
import AddVariants from "./AddVariant";
import AddProductImage from "./AddProductImage";
import { useProduct } from "../../hooks/useProduct";

interface AddProductProps {
  isCreateProductOpen: boolean;
  setIsCreateProductOpen: (value: boolean) => void;
}
const AddProduct = ({
  isCreateProductOpen,
  setIsCreateProductOpen,
}: AddProductProps) => {
  const [product, setProduct] = useState<ProductCreate>({
    name: "product 1",
    price: 200000,
    hot_price: 180000,
    category_id: "1370bb09-ad5f-4495-87e7-9cc6df753fc6",
    description:
      'Hai số phận” không chỉ đơn thuần là một cuốn tiểu thuyết, đây có thể xem là "thánh kinh" cho những người đọc và suy ngẫm, những ai không dễ dãi, không chấp nhận lối mòn.\n“Hai số phận” làm rung động mọi trái tim quả cảm, nó có thể làm thay đổi cả cuộc đời bạn. Đọc cuốn sách này, bạn sẽ bị chi phối bởi cá tính của hai nhân vật chính, hoặc bạn là Kane, hoặc sẽ là Abel, không thể nào nhầm lẫn. Và điều đó sẽ khiến bạn thấy được chính mình.\nKhi bạn yêu thích tác phẩm này, người ta sẽ nhìn ra cá tính và tâm hồn thú vị của bạn!\n“Nếu có giải thưởng Nobel về khả năng kể chuyện, giải thưởng đó chắc chắn sẽ thuộc về Archer.”\n- Daily Telegraph',
    thumbnail:
      "https://salt.tikicdn.com/cache/280x280/ts/product/4b/3b/3d/64a70b8e5d0867750b6ae43025f13362.jpg",
    images: [
      "https://salt.tikicdn.com/ts/product/cb/c2/4e/b76fef0cf3d2ec3c8bfe2a87f8a715d0.jpg",
      "https://salt.tikicdn.com/ts/product/51/d3/a4/90e620ddfa5c56167ed09339176e0639.jpg",
      "https://salt.tikicdn.com/ts/product/a9/60/75/e2ea2d1f3629faf6e5b30242562b951f.jpg",
    ],
    attributes: [],
    variants: [],
  });

  const productStore = useProduct();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await productStore.add(product);
    setIsCreateProductOpen(false);
  };

  return (
    <>
      <div
        id="drawer-create-product-default"
        style={{
          scrollbarWidth: "none",
        }}
        className={twMerge([
          `fixed top-0 right-0 z-50 w-full h-screen max-w-2xl p-4 overflow-y-auto
      transition-transform bg-white dark:bg-gray-800`,
          isCreateProductOpen ? "translate-x-0" : "translate-x-full",
        ])}
        tabIndex={-1}
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          New Product
        </h5>
        <button
          type="button"
          onClick={() => setIsCreateProductOpen(false)}
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
                value={product.name}
                onChange={(e) => {
                  setProduct({ ...product, name: e.target.value });
                }}
                id="name"
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
                value={product.price}
                onChange={(e) => {
                  setProduct({ ...product, price: Number(e.target.value) });
                }}
                id="price"
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
                name="discount-price"
                id="discount-price"
                value={product.hot_price?.toString() || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setProduct({ ...product, hot_price: undefined });
                    return;
                  }
                  if (isNaN(Number(e.target.value))) {
                    setProduct({ ...product });
                    return;
                  }
                  setProduct({ ...product, hot_price: Number(e.target.value) });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="đ2999"
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
              <AddProductImage
                images={product.images}
                thumbnail={product.thumbnail}
                setImages={(images) => {
                  setProduct({ ...product, images });
                }}
                setThumbnail={(thumbnail) => {
                  setProduct({ ...product, thumbnail });
                }}
              />
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
                onClick={() => setIsCreateProductOpen(false)}
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
      {isCreateProductOpen && (
        <div
          className="fixed bg-black/20 top-0 left-0 right-0 bottom-0 z-20"
          onClick={() => {
            setIsCreateProductOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default AddProduct;
