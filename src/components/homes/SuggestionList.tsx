import { useSuggestions } from "../../hooks/useSuggestion";
import InfiniteScroll from "../InfiniteScroll";
import ProductCard from "./ProductCard";

const SuggestionList = () => {
  const suggestionStore = useSuggestions();

  return (
    <>
      <div className="container min-h-[70vh] mt-2 p-4">
        <div className="grid grid-cols-5 gap-4">
          {suggestionStore.data.map((product, i) => (
            <div key={product.id+i}>
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

export default SuggestionList;
