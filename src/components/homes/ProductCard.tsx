import { Link } from "react-router-dom";
import { ProductPreview } from "../../services/types";
import { twMerge } from "tailwind-merge";
import { formatCurrency } from "../../utils";
import { useEffect, useState } from "react";
import { useWishList } from "../../hooks/useWishList";
import { useSuggestions } from "../../hooks/useSuggestion";

interface ProductCardProps {
  product: ProductPreview;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(product.is_like);

  useEffect(() => {
    setIsFavorite(product.is_like);
  }, [product.is_like]);

  const wishlistStore = useWishList();
  const suggestionStore = useSuggestions();

  const onLike = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      if (!(await wishlistStore.remove(product?.id!))) {
        setIsFavorite(true);
      }
    } else {
      setIsFavorite(true);
      suggestionStore.addLike(product.id);
      if (!(await wishlistStore.add(product?.id!))) {
        setIsFavorite(false);
      }
    }
  };

  return (
    <div
      className={twMerge([
        "w-100 shadow-sm rounded border border-gray-200",
        product.deleted_at && "opacity-50 cursor-not-allowed",
      ])}
    >
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none text-dark"
      >
        <div className="image-container">
          <img src={product.thumbnail} className="card-img-top rounded-top" />
        </div>
      </Link>
      <div className="card-body d-flex flex-column p-3">
        <Link to={`/products/${product.id}`}>
          <h5 className="card-title line-clamp-2 h-14 text-lg font-semibold">
            {product.name}
          </h5>
        </Link>
        {product.hot_price ? (
          <div className="flex flex-row align-items-center">
            <h5 className="mb-1 me-2 text-green-600">
              {formatCurrency(Number(product.hot_price))}
            </h5>
            <span className="text-orange-500">
              <s>{formatCurrency(Number(product.price))}</s>
            </span>
          </div>
        ) : (
          <div className="d-flex flex-row align-items-center">
            <h5 className="card-title">
              {formatCurrency(Number(product.price))}
            </h5>
          </div>
        )}
        <p className="card-text line-clamp-2 h-12">{product.description}</p>
        <div className="card-footer flex justify-between align-items-center pt-3 px-0 pb-0 mt-auto border-0 bg-white">
          <button className="shadow bg-blue-500 p-1 px-2 rounded-md text-white">
            Add to cart
          </button>
          <button onClick={onLike}>
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
