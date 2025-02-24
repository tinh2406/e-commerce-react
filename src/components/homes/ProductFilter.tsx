import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSuggestions } from "../../hooks/useSuggestion";

const ProductFilter = () => {
  const productStore = useSuggestions();

  const [priceExpand, setPriceExpand] = useState(false);
  const [sortExpand, setSortExpand] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const priceText = useMemo(() => {
    return priceFrom && priceTo
      ? `${priceFrom} - ${priceTo}`
      : priceFrom
      ? `From: ${priceFrom}`
      : priceTo
      ? `To: ${priceTo}`
      : "All";
  }, [priceFrom, priceTo]);

  useEffect(() => {
    setPriceFrom((prev) =>
      prev === productStore.query.price_from?.toString()
        ? prev
        : productStore.query.price_from?.toString() || ""
    );
  }, [productStore.query.price_from]);
  useEffect(() => {
    setPriceTo((prev) =>
      prev === productStore.query.price_to?.toString()
        ? prev
        : productStore.query.price_to?.toString() || ""
    );
  }, [productStore.query.price_to]);

  const toggleOrderType = () => {
    productStore.setQuery({
      order_type: productStore.query.order_type === "asc" ? "desc" : "asc",
    });
  };

  const handlePriceFromInput = (text: string) => {
    let price = undefined;
    if (text && Number.isInteger(parseInt(text))) {
      price = parseInt(text);
      price = `${price}`;
    }

    setPriceFrom(price || "");
  };
  const handlePriceToInput = (text: string) => {
    let price = undefined;
    if (text && Number.isInteger(parseInt(text))) {
      price = parseInt(text);
      price = `${price}`;
    }

    setPriceTo(price || "");
  };

  const orderBy = (orderBy: string | undefined) => {
    setSortExpand(false);
    productStore.setQuery({ order_by: orderBy });
  };

  const clearClick = () => {
    setPriceFrom("");
    setPriceTo("");
    setSortExpand(false);
    setPriceExpand(false);
    productStore.setQuery({
      price_from: undefined,
      price_to: undefined,
      order_by: undefined,
      order_type: undefined,
      category_id: undefined,
    });
  };
  const applyClick = () => {
    setSortExpand(false);
    setPriceExpand(false);
    productStore.setQuery({
      price_from: priceFrom ? parseInt(priceFrom) : undefined,
      price_to: priceTo ? parseInt(priceTo) : undefined,
    });
  };

  return (
    <>
      <label className="font-semibold text-xl"> Product filter </label>
      <div className="flex gap-4 justify-end items-center">
        <div className="relative items-center gap-2">
          <button
            className="font-semibold text-lg"
            onClick={() => setPriceExpand(!priceExpand)}
            aria-haspopup="true"
            aria-expanded="true"
          >
            Price: <span className="font-normal">{priceText}</span>
          </button>
          <div
            className={twMerge([
              "absolute right-0 w-48 h-0 bg-white border-gray-200 rounded-md shadow-lg z-10 overflow-hidden",
              priceExpand && "h-fit",
            ])}
          >
            <div
              className={twMerge([
                "transition-all h-0 m-2",
                priceExpand && "h-[76px]",
              ])}
            >
              <div className="flex flex-col gap-2">
                <input
                  placeholder="From"
                  value={priceFrom}
                  onChange={(e) => handlePriceFromInput(e.target.value)}
                  className="border border-gray-100 rounded-md px-2 py-1 text-right"
                />
                <input
                  placeholder="To"
                  value={priceTo}
                  onChange={(e) => handlePriceToInput(e.target.value)}
                  className="border border-gray-100 rounded-md px-2 py-1 text-right"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative text-left flex">
          <div className="flex items-center gap-2">
            <label className="font-semibold text-lg">Sort by:</label>
            <button
              type="button"
              className="border border-gray-100 rounded-md w-24 px-2 py-1 bg-white inline-flex items-center justify-center"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setSortExpand(!sortExpand)}
            >
              <span className="mr-2 capitalize">
                {productStore.query.order_by || "Default"}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center" onClick={toggleOrderType}>
            {productStore.query.order_type === "asc" ? (
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22l8.5-11h-17L12 22zm0-14c1.1 0 2-.9 2-2V4h-4v2c0 1.1.9 2 2 2z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L3.5 13h17L12 2zm0 14c-1.1 0-2 .9-2 2v2h4v-2c0-1.1-.9-2-2-2z" />
              </svg>
            )}
          </div>

          <div
            className={twMerge([
              "absolute right-0 mt-8 w-48 h-0 bg-white border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden",
              sortExpand && "h-fit",
            ])}
          >
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className={twMerge([
                "transition-all h-0 m-2",
                sortExpand && "h-[108px]",
              ])}
            >
              <button
                className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => orderBy(undefined)}
              >
                <span>Default</span>
              </button>
              <button
                className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => orderBy("name")}
              >
                <span>Name</span>
              </button>
              <button
                className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => orderBy("price")}
              >
                <span>Price</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="text-blue-500 font-semibold mr-2 px-2 rounded-md hover:bg-gray-100"
            onClick={applyClick}
          >
            Apply
          </button>
          <button
            className="font-light text-gray-600 mr-2 hover:text-gray-900"
            onClick={clearClick}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
