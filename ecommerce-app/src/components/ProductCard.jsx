import { Link } from "react-router-dom";
import AddToCartControl from "./AddToCartControl";
import { optimizeImageUrl } from "../utils/imageUrl";

function ProductCard({ product, priority = false }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full">
      <img
        src={optimizeImageUrl(product.image, 400)}
        alt={product.name}
        width={400}
        height={208}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        className="h-44 sm:h-48 md:h-52 w-full object-cover"
      />

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 sm:gap-3">
          <h2 className="text-base sm:text-lg font-bold leading-tight text-zinc-900 line-clamp-2">
            {product.name}
          </h2>

          <p className="text-amber-500 font-bold text-base sm:text-lg shrink-0">
            ₹{product.price}
          </p>
        </div>

        <p className="text-gray-500 text-xs sm:text-sm mt-1.5 sm:mt-2 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="mt-3 sm:mt-4">
          <AddToCartControl product={product} />
        </div>

        <Link
          to={`/product/${product.id}`}
          className="block mt-2.5 sm:mt-3 text-center text-xs sm:text-sm text-gray-500 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
