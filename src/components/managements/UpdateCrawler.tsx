import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CrawlerCreate } from "../../services/types";
import EverySelect from "./EverySelect";
import ProductMapperSelect from "./ProductMapperSelect";
import ProductsMappersSelect from "./ProductsMapperSelect";
import { GetCrawlerDetailService } from "../../services/crawler.service";
import { useCrawler } from "../../hooks/useCrawler";

interface UpdateCrawlerProps {
  crawlerId: string | undefined;
  setCrawlerId: (value: string | undefined) => void;
}
const UpdateCrawler = ({ crawlerId, setCrawlerId }: UpdateCrawlerProps) => {
  const [crawler, setCrawler] = useState<CrawlerCreate>({
    name: "",
    url: "",
    detail_url: "",
    quantity: 0,
    start_time: "",
    end_time: "",
    product_mapper_id: "",
    products_mapper_id: "",
    params: {
      take_key: "",
      page_key: "",
    },
    headers: {},
  });

  const [headers, setHeaders] = useState("");
  const [params, setParams] = useState("");
  const [errorHeaders, setErrorHeaders] = useState("");
  const [errorParams, setErrorParams] = useState("");

  useEffect(() => {
    try {
      const parsedHeaders = JSON.parse(headers);
      setCrawler({ ...crawler, headers: parsedHeaders });
      setErrorHeaders("");
    } catch (error) {
      setErrorHeaders("Wait a valid JSON");
    }
  }, [headers]);
  useEffect(() => {
    try {
      const parsedParams = JSON.parse(params);
      setCrawler({ ...crawler, params: parsedParams });
      setErrorParams("");
    } catch (error) {
      setErrorParams("Wait a valid JSON");
    }
  }, [params]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      if (!crawlerId) return;
      setIsLoading(true);
      try {
        const response = await GetCrawlerDetailService(crawlerId);
        let every = response.crontab
          ? response.crontab.month_of_year
            ? "year"
            : response.crontab.day_of_month
            ? "month"
            : response.crontab.day_of_week
            ? "week"
            : response.crontab.hour
            ? "day"
            : response.crontab.minute
            ? "hour"
            : "minute"
          : undefined;
        setCrawler({
          name: response.name,
          url: response.kwargs.url,
          detail_url: response.kwargs.detail_url,
          quantity: response.kwargs.quantity,
          start_time: response.start_time
            ? new Date(response.start_time).toISOString().slice(0, 16)
            : "",
          end_time: response.expires
            ? new Date(response.expires).toISOString().slice(0, 16)
            : "",
          cycle_length: response.interval?.every,
          // @ts-ignore
          every: every,
          product_mapper_id: response.kwargs.product_mapper_id,
          products_mapper_id: response.kwargs.products_mapper_id,
          params: response.params,
          headers: response.headers,
        });
        setHeaders(JSON.stringify(response.headers, null, 3));
        setParams(JSON.stringify(response.params, null, 3));
      } catch (error) {}
      setIsLoading(false);
    };
    fetch();
  }, [crawlerId]);

  const crawlerStore = useCrawler();
  const handleUpdateCrawler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await crawlerStore.update(crawlerId as string, crawler);
      setCrawlerId(undefined);
    } catch (error: any) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div
        id="drawer-create-crawler-default"
        style={{
          scrollbarWidth: "none",
        }}
        className={twMerge([
          `fixed top-0 right-0 z-50 w-full h-screen max-w-2xl p-4 overflow-y-auto
      transition-transform bg-white dark:bg-gray-800`,
          crawlerId ? "translate-x-0" : "translate-x-full",
        ])}
        tabIndex={-1}
        aria-labelledby="drawer-label"
        aria-hidden="true"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Update Crawler
        </h5>
        <button
          type="button"
          onClick={() => setCrawlerId(undefined)}
          data-drawer-dismiss="drawer-create-crawler-default"
          aria-controls="drawer-create-crawler-default"
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
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <form
            className="h-[calc(100%-100px)] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
            }}
            onSubmit={handleUpdateCrawler}
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
                  value={crawler.name}
                  onChange={(e) => {
                    setCrawler({ ...crawler, name: e.target.value });
                  }}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type crawler name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={crawler.quantity}
                  onChange={(e) => {
                    setCrawler({
                      ...crawler,
                      quantity: parseInt(e.target.value),
                    });
                  }}
                  id="quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type quantity"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="url"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Url
                </label>
                <input
                  name="url"
                  value={crawler.url}
                  onChange={(e) => {
                    setCrawler({ ...crawler, url: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type crawler url"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="detail-url"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Detail url
                </label>
                <input
                  name="detail-url"
                  id="detail-url"
                  value={crawler.detail_url}
                  onChange={(e) => {
                    setCrawler({ ...crawler, detail_url: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type crawler detail url"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="start-time"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start time
                </label>
                <input
                  type="datetime-local"
                  name="start-time"
                  value={crawler.start_time}
                  onChange={(e) => {
                    setCrawler({
                      ...crawler,
                      start_time: e.target.value,
                    });
                  }}
                  id="start-time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Choose start time"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="end-time"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  End time
                </label>
                <input
                  type="datetime-local"
                  name="end-time"
                  value={crawler.end_time}
                  onChange={(e) => {
                    setCrawler({
                      ...crawler,
                      end_time: e.target.value,
                    });
                  }}
                  id="end-time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Choose end time"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="cycle-length"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Every (minutes)
                </label>
                <input
                  type="number"
                  name="cycle-length"
                  value={crawler.cycle_length}
                  onChange={(e) => {
                    setCrawler({
                      ...crawler,
                      cycle_length: parseInt(e.target.value),
                    });
                  }}
                  id="cycle-length"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type cycle length"
                />
              </div>
              <div>
                <label
                  htmlFor="every"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Every
                </label>
                <EverySelect
                  value={crawler.every}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  setValue={(value) => {
                    setCrawler({ ...crawler, every: value });
                  }}
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="product-mapper"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product mapper
                </label>
                <ProductMapperSelect
                  value={crawler.product_mapper_id}
                  setValue={(value) => {
                    setCrawler({ ...crawler, product_mapper_id: value });
                  }}
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="products-mapper"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Products mapper
                </label>
                <ProductsMappersSelect
                  value={crawler.products_mapper_id}
                  setValue={(value) => {
                    setCrawler({ ...crawler, products_mapper_id: value });
                  }}
                />
              </div>
              <div className="flex-col col-span-2 gap-2">
                <label
                  htmlFor="headers"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Headers
                </label>

                <textarea
                  name="headers"
                  id="headers"
                  rows={6}
                  value={headers}
                  onChange={(e) => {
                    setHeaders(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type headers"
                  required
                />
                {errorHeaders && (
                  <span className="text-red-500 text-sm">{errorHeaders}</span>
                )}
              </div>
              <div className="flex-col gap-2 col-span-2">
                <label
                  htmlFor="params"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Params
                </label>

                <textarea
                  name="params"
                  id="params"
                  rows={6}
                  value={params}
                  onChange={(e) => {
                    setParams(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type params"
                  required
                />
                {errorParams && (
                  <span className="text-red-500 text-sm">{errorParams}</span>
                )}
              </div>
              <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute">
                <button
                  type="submit"
                  className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Save
                </button>
                <button
                  type="button"
                  data-drawer-dismiss="drawer-create-crawler-default"
                  onClick={() => setCrawlerId(undefined)}
                  aria-controls="drawer-create-crawler-default"
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
        )}
      </div>
      {crawlerId && (
        <div
          className="fixed bg-black/20 top-0 left-0 right-0 bottom-0 z-20"
          onClick={() => {
            setCrawlerId(undefined);
          }}
        ></div>
      )}
    </>
  );
};

export default UpdateCrawler;
