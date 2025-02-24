import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useCategory } from "../../hooks/useCategory";
import { useSuggestions } from "../../hooks/useSuggestion";
import InfiniteScroll from "../InfiniteScroll";

const CategoryList = () => {
  const categoryStore = useCategory();
  const productStore = useSuggestions();
  const [keyword, setKeyword] = useState(categoryStore.query.keyword || "");

  const debouncedSearchTerm = useDebounce(keyword, 300);

  useEffect(() => {
    const k = categoryStore.query.keyword || "";

    if (debouncedSearchTerm != k) {
      categoryStore.setQuery({
        keyword: debouncedSearchTerm || undefined,
      });
    }
  }, [debouncedSearchTerm]);

  const filterByCategory = (categoryId?: string) => {
    productStore.setQuery({
      ...productStore.query,
      category_id: categoryId || undefined,
    });
  };

  return (
    <aside className="col-span-1 bg-white rounded-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-200 rounded-md w-full px-2 py-1 mt-2"
          placeholder="Search category"
        />
        <ul className="mt-2 w-full">
          <li className="py-2">
            <button
              className={twMerge([
                "hover:text-primary hover:underline",
                productStore.query.category_id
                  ? "text-gray-600"
                  : "text-primary",
              ])}
              onClick={() => filterByCategory()}
            >
              All
            </button>
          </li>
          {categoryStore.data.map((category) => (
            <li
              key={category.id}
              className="w-full"
              onClick={() => filterByCategory(category.id)}
            >
              <button
                className={twMerge([
                  "hover:text-primary truncate py-2 w-full text-left hover:underline",
                  productStore.query.category_id === category.id
                    ? "text-primary"
                    : "text-gray-600",
                ])}
              >
                {category.name}
              </button>
            </li>
          ))}
          <InfiniteScroll store={categoryStore} />
        </ul>
      </div>
    </aside>
  );
};

export default CategoryList;
