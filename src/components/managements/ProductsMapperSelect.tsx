import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import InfiniteScroll from "../InfiniteScroll";

import { useProductsMapper } from "../../hooks/useProductsMapper";

interface ProductsMapperSelectProps {
  value: string | undefined;
  setValue: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const ProductsMappersSelect = ({
  value,
  setValue,
  disabled,
}: ProductsMapperSelectProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const productsMapperStore = useProductsMapper();

  const [search, setSearch] = useState("");

  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    const k = productsMapperStore.query.keyword || "";

    if (debouncedSearchTerm != k) {
      productsMapperStore.setQuery({
        keyword: debouncedSearchTerm || undefined,
      });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    return () => {
      productsMapperStore.setQuery({
        keyword: undefined,
      });
    };
  }, []);

  return (
    <div
      className={twMerge([
        `relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500
         focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`,
      ])}
    >
      {isExpand && (
        <div
          className="fixed top-0 right-0 left-0 bottom-0"
          onClick={() => {
            setIsExpand(false);
          }}
        ></div>
      )}
      <div
        className="h-5 truncate"
        onClick={() => {
          if (disabled) return;
          setIsExpand(true);
        }}
      >
        {value
          ? productsMapperStore.data.find(
              (productsMapper) => productsMapper.id === value
            )?.name
          : "Select product mapper"}
      </div>
      <div
        className={twMerge([
          `absolute top-10 overflow-hidden w-full  
      left-0 bg-white border-gray-200 rounded-md shadow-lg z-20 dark:bg-gray-800`,
          isExpand ? "h-fit p-3" : "h-0",
        ])}
      >
        <input
          className="border rounded-md w-full py-1 px-2"
          placeholder="Search product mapper"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className="flex flex-col gap-2 mt-2  max-h-60 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {productsMapperStore.data.map((productsMapper) => (
            <button
              type="button"
              key={productsMapper.id}
              onClick={() => {
                setValue(productsMapper.id);
                setIsExpand(false);
              }}
              className="px-2 py-1 hover:bg-gray-200/90 w-full text-start rounded-md"
            >
              {productsMapper.name}
            </button>
          ))}
          <InfiniteScroll store={productsMapperStore} />
        </div>
      </div>
      {value && (
        <button
          onClick={() => {
            if (disabled) return;
            setValue("");
          }}
          className="absolute right-2 top-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ProductsMappersSelect;
