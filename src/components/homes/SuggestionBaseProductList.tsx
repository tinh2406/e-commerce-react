import { useSuggestionBaseOneProduct } from "../../hooks/useSuggestionBaseOneProduct";
import InfiniteScroll from "../InfiniteScroll";
import ProductCard from "./ProductCard";

const SuggestionBaseProductList = () => {
  const suggestionStore = useSuggestionBaseOneProduct();

  return (
    <>
      <div className="container min-h-[70vh] mt-2 p-4">
        <div className="grid grid-cols-6 gap-4">
          {suggestionStore.data.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {!suggestionStore.data.length && (
          <div v-if="!products.length" className="col-span-5 text-center">
            <p className="mt-5 text-lg">No products found</p>
          </div>
        )}
      </div>
      <InfiniteScroll store={suggestionStore} />
    </>
  );
};

export default SuggestionBaseProductList;
