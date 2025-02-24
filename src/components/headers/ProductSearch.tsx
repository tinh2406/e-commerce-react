import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSuggestions } from "../../hooks/useSuggestion";

const ProductSearch = () => {
  const location = useLocation();
  const productStore = useSuggestions();

  const [keyword, setKeyword] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setKeyword(searchParams.get("keyword") || productStore.query.keyword || "");

    let keyword = searchParams.get("keyword") || "";
    let category = searchParams.get("category");
    let price_from = searchParams.get("price_from");
    let price_to = searchParams.get("price_to");
    let order_by = searchParams.get("order_by");
    let order_type = searchParams.get("order_type");

    console.log(keyword, category, price_from, price_to, order_by, order_type);

    productStore.setQuery({
      keyword,
      // category_id: category ? parseInt(category) : undefined,
      price_from: price_from ? parseInt(price_from) : undefined,
      price_to: price_to ? parseInt(price_to) : undefined,
      order_by:
        order_by === "price"
          ? "price"
          : order_by === "name"
          ? "name"
          : undefined,
      order_type: order_type === "asc" ? "asc" : "desc",
    });
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      ...(productStore.query.keyword && {
        keyword: productStore.query.keyword,
      }),
      // ...(productStore.query.category_id && {}
      ...(productStore.query.price_from && {
        price_from: productStore.query.price_from?.toString(),
      }),
      ...(productStore.query.price_to && {
        price_to: productStore.query.price_to?.toString(),
      }),
      ...(productStore.query.order_by && {
        order_by: productStore.query.order_by === "price" ? "price" : "name",
      }),
      ...(productStore.query.order_type && {
        order_type: productStore.query.order_type === "asc" ? "asc" : "desc",
      }),
    });
  }, [productStore.query]);

  const search = useDebounce(keyword, 500);

  useEffect(() => {
    const k = productStore.query.keyword || "";
    if (search != k) {
      productStore.setQuery({
        keyword: search || undefined,
      });
      setSearchParams({ keyword: search });
    }
  }, [search]);

  return (
    <div
      className={twMerge([
        "flex-grow max-w-4xl items-center border-gray-300 border px-2 rounded-md",
        location.pathname == "/" ? "flex" : "hidden",
      ])}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <line
          x1="15"
          y1="15"
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        className="w-full h-10 px-2 py-1 text-sm rounded-md focus:outline-none"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="border-l-2 px-2 hover:text-blue-500">Search</button>
    </div>
  );
};

export default ProductSearch;
