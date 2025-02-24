import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import SuggestionBaseProductList from "../components/homes/SuggestionBaseProductList";
import { useLoading } from "../hooks/useLoading";
import { useSuggestions } from "../hooks/useSuggestion";
import { useWishList } from "../hooks/useWishList";
import { GetProductDetailService } from "../services/products.service";
import { HiddenRatingService } from "../services/rating.service";
import { type ProductDetail } from "../services/types";
import { formatCurrency } from "../utils";
import { useSuggestionBaseOneProduct } from "../hooks/useSuggestionBaseOneProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const loadingStore = useLoading();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const [displayImage, setDisplayImage] = useState(product?.thumbnail);
  const [currentVariant, setCurrentVariant] = useState(product?.variants?.[0]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const suggestionStore = useSuggestions();
  const suggestionBaseOneProductStore = useSuggestionBaseOneProduct();

  const total = useMemo(() => {
    return formatCurrency(
      (currentVariant?.hot_price ||
        currentVariant?.price ||
        product?.hot_price ||
        product?.price!) * quantity
    );
  }, [currentVariant, product, quantity]);

  const attributes = useMemo(() => {
    return product?.attributes ? Object.keys(product.attributes) : [];
  }, [product]);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        loadingStore.loading();
        try {
          const product = await GetProductDetailService(id);
          setProduct(product);
          setIsFavorite(!!product.is_like);
        } catch (error) {}
        loadingStore.loaded();
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (id) {
        suggestionStore.addLike(id);
        await HiddenRatingService(id, 2);
        console.log("Hidden rating");
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  useEffect(() => {
    if (id) suggestionBaseOneProductStore.load(id);
  }, [id]);

  const changeVariant = (_variant: Record<string, string>) => {
    const newAttr = { ...currentVariant?.attributes, ..._variant };
    const newVariant = product?.variants?.find((v) => {
      return Object.keys(newAttr).every(
        (key) => v.attributes[key] === newAttr[key]
      );
    });
    setCurrentVariant(newVariant);
    setDisplayImage(newVariant?.image);
  };

  const formatAttribute = (attributes?: Record<string, string>) => {
    if (!attributes) return product?.name;
    return Object.values(attributes).join(" - ");
  };

  const wishlistStore = useWishList();

  const onLike = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      if (!(await wishlistStore.remove(product?.id!))) {
        setIsFavorite(true);
      }
    } else {
      setIsFavorite(true);
      suggestionStore.addLike(product?.id!);
      if (!(await wishlistStore.add(product?.id!))) {
        setIsFavorite(false);
      }
    }
  };

  return (
    <div className="xl:w-[96rem] mx-auto">
      <div className="text-lg">
        <Link className="font-semibold" to="/">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span>Products / {product?.name}</span>
      </div>
      <div className="container mt-2 grid grid-cols-10 gap-4">
        <div className="col-span-7 grid grid-cols-7 gap-4">
          <div className="col-span-3">
            <div className="bg-white round-md p-3 sticky top-24">
              <div className="border border-gray-200 rounded-md">
                <img
                  src={displayImage || product?.thumbnail}
                  alt={product?.name}
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div
                className="w-full mt-4 flex gap-2 overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {product?.images?.map((image, i) => (
                  <img
                    key={image + i}
                    className={twMerge([
                      "w-16 h-16 p-2 border border-gray-200 object-contain rounded-md cursor-pointer",
                      displayImage === image && "bg-blue-100",
                    ])}
                    src={image}
                    alt={image}
                    onClick={() => setDisplayImage(image)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-3">
            <div className="bg-white rounded-md p-4">
              <h2 className="text-2xl font-medium">{product?.name}</h2>

              {attributes.map((attribute) => (
                <div className="mt-4" key={attribute}>
                  <h3 className="text-md font-bold">{attribute}</h3>
                  <ul className="mt-2 grid grid-cols-4 gap-2">
                    {product?.attributes?.[attribute].map((value) => (
                      <div
                        key={value}
                        className={twMerge([
                          "border-2 rounded-md px-2 py-1 cursor-pointer",
                          currentVariant?.attributes[attribute] === value
                            ? "border-blue-500 text-blue-500"
                            : "border-gray-200",
                        ])}
                        onClick={() => changeVariant({ [attribute]: value })}
                      >
                        {value}
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mt-8 flex gap-2 items-end justify-between">
                <div className="flex gap-2 items-end">
                  {(currentVariant
                    ? currentVariant.hot_price
                    : product?.hot_price) && (
                    <span className="text-xl text-blue-500">
                      {formatCurrency(
                        currentVariant?.hot_price || product?.hot_price!
                      )}
                    </span>
                  )}
                  <span
                    className={twMerge([
                      "text-lg font-bold text-blue-500",
                      !currentVariant?.hot_price &&
                        !product?.hot_price &&
                        "line-through font-light",
                    ])}
                  >
                    {formatCurrency(currentVariant?.price || product?.price!)}
                  </span>
                </div>
                <div onClick={onLike}>
                  {isFavorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="28"
                      height="28"
                      fill="red"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="red"
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-4">
              <h2 className="text-2xl font-bold">Description</h2>
              <p
                className={twMerge([
                  "mt-2",
                  !isDescriptionExpanded && "line-clamp-[12]",
                ])}
              >
                {product?.description}
              </p>
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-2 text-blue-500 hover:underline"
              >
                {isDescriptionExpanded ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
          <div className="col-span-7 bg-white"></div>
        </div>
        <div className="col-span-3">
          <div className="bg-white rounded-md p-4 sticky top-24 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Add to cart</h2>
            <div className="flex gap-2 items-center">
              <img
                src={currentVariant?.image || product?.thumbnail}
                alt={currentVariant?.image || product?.name}
                className="w-12 h-12 rounded-md p-1 border border-gray-200"
              />
              <label className="flex-1 text-lg font-medium">
                {formatAttribute(currentVariant?.attributes)}
              </label>
            </div>
            <label className="flex-1 text-lg font-medium">Quantity</label>
            <div className="flex gap-2 items-center">
              <button
                className="w-16 p-1 text-2xl border border-gray-200 rounded-md"
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                className="w-16 p-2 border border-gray-200 rounded-md text-right"
                value={quantity}
                onChange={(e) => {
                  if (Number.isInteger(Number(e.target.value)))
                    setQuantity(Number(e.target.value));
                }}
              />
              <button
                className="w-16 p-1 text-2xl border border-gray-200 rounded-md"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <label className="flex-1 text-lg font-medium">Total</label>
            <span className="text-lg font-bold text-blue-500">{total}</span>
            <button className="w-full p-2 bg-blue-500 text-white rounded-md">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <SuggestionBaseProductList />
    </div>
  );
};

export default ProductDetail;
