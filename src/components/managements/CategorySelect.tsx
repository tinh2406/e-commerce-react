import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import InfiniteScroll from "../InfiniteScroll";

import { create } from "zustand";
import { Action } from "../../hooks/type";
import {
  GetCategoryDetailService,
  SearchCategoriesService,
} from "../../services/categories.service";
import { Category, CategoryQuery, DataPagingList } from "../../services/types";

interface CategoryStore extends DataPagingList<Category>, Action {
  query: CategoryQuery;
}

const useCategory = create<CategoryStore>((set, get) => ({
  data: [],
  page: 1,
  page_size: 10,
  page_count: undefined,
  item_count: 0,
  loading: false,
  error: undefined,
  query: {
    page: 1,
    page_size: 10,
    is_deleted: false,
  },

  setQuery: (query: CategoryQuery) => {
    set({ query: { ...get().query, ...query, page: 1 } });
    get().fetch();
  },
  async fetch() {
    if (get().loading) return;
    set({ loading: true });
    try {
      const response = await SearchCategoriesService(get().query);
      set({
        data: response.data,
        page: response.page,
        page_size: response.page_size,
        page_count: response.page_count,
        item_count: response.item_count,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
  async loadNextPage() {
    const isLoading = get().loading;
    const page = get().page;
    const page_count = get().page_count;
    if (isLoading) return;
    if (page_count && page < page_count) {
      set({ query: { ...get().query, page: page + 1 }, loading: true });

      try {
        const response = await SearchCategoriesService(get().query);
        set({
          data: [...get().data, ...response.data],
          page: response.page,
          page_size: response.page_size,
          page_count: response.page_count,
          item_count: response.item_count,
          loading: false,
        });
      } catch (error) {
        set({ loading: false });
      }
    }
  },
}));

useCategory.getState().fetch();

interface CategorySelectProps {
  value: string | undefined;
  setValue: (value: string) => void;
  className?: string;
}

const CategorySelect = ({ value, setValue }: CategorySelectProps) => {
  const [isExpand, setIsExpand] = useState(false);

  const categoryStore = useCategory();

  const [search, setSearch] = useState("");

  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    const k = categoryStore.query.keyword || "";

    if (debouncedSearchTerm != k) {
      categoryStore.setQuery({
        keyword: debouncedSearchTerm || undefined,
      });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    return () => {
      categoryStore.setQuery({
        keyword: undefined,
      });
    };
  }, []);

  const [category, setCategory] = useState<Category | undefined>(undefined);
  useEffect(() => {
    if (value) {
      let cat = categoryStore.data.find((cat) => cat.id === value);
      if (cat) {
        setCategory(cat);
        return;
      }
      GetCategoryDetailService(value).then((response) => {
        setCategory(response);
      });
    } else {
      setCategory(undefined);
    }
  }, [value]);

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
      <div className="h-5 truncate" onClick={() => setIsExpand(true)}>
        {category ? category?.name : "Select category"}
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
          placeholder="Search category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className="flex flex-col gap-2 mt-2  max-h-60 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {categoryStore.data.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => {
                setValue(category.id);
                setIsExpand(false);
              }}
              className="px-2 py-1 hover:bg-gray-200/90 w-full text-start rounded-md"
            >
              {category.name}
            </button>
          ))}
          <InfiniteScroll store={categoryStore} />
        </div>
      </div>
      {value && (
        <button onClick={() => setValue("")} className="absolute right-2 top-3">
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

export default CategorySelect;
