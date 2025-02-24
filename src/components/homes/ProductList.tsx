import ProductFilter from "./ProductFilter";
import SuggestionList from "./SuggestionList";

const ProductList = () => {
  return (
    <>
      <div className="sticky top-[92px] z-10 bg-white p-2 rounded-md shadow flex justify-between">
        <ProductFilter />
      </div>
      <SuggestionList />
    </>
  );
};

export default ProductList;
