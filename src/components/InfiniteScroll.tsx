import { useEffect, useRef } from "react";
import { Action, DataPagingList } from "../hooks/type";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-4 mx-auto">
      <svg
        className="animate-spin h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}

export default function InfiniteScroll({
  store,
}: {
  store: DataPagingList & Action;
}) {
  const loadMoreTrigger = useRef(null);
  const intervalId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        if (!intervalId.current) {
          intervalId.current = setInterval(() => {
            store.loadNextPage();
          }, 200);
        }
        if (store.page_count && store.page > store.page_count) {
          clearInterval(intervalId.current);
          intervalId.current = undefined;
        }
      } else {
        if (intervalId.current) {
          clearInterval(intervalId.current);
          intervalId.current = undefined;
        }
      }
    };

    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0.1,
    });

    if (loadMoreTrigger.current) {
      observer.observe(loadMoreTrigger.current);
    }

    return () => {
      if (loadMoreTrigger.current) {
        observer.unobserve(loadMoreTrigger.current);
      }
    };
  }, [store]);

  return (
    <div>
      {store.loading && <LoadingSpinner />}
      <div ref={loadMoreTrigger} className="h-4 w-full invisible"></div>
    </div>
  );
}
