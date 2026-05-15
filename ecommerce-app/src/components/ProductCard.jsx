import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";

function ProductCard({ product }) {
  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="h-52 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold">
            ₹{product.price}
          </p>

          <button
            onClick={() =>
              addToCart(product)
            }
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="block mt-4 text-center border py-2 rounded-lg hover:bg-gray-100"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;