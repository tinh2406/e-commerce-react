import CategoryList from "../components/homes/CategoryList";
import ProductList from "../components/homes/ProductList";

const Home = () => {

  return (
    <div className="p-4 grid grid-cols-5 gap-4">
      <div
        style={{
          scrollbarWidth: "none",
        }}
        className="col-span-1 top-24 h-full sticky max-h-[calc(100dvh-8rem)] overflow-y-auto bg-white rounded-md"
      >
        <CategoryList />
      </div>
      <div className="col-span-4 bg-white rounded-md">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
