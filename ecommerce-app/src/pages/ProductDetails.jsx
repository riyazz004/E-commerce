import { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import useCartStore from "../store/useCartStore";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return (
      <div className="p-10 text-2xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-10">

        {/* IMAGE */}

        <div className="p-6 flex items-center justify-center bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl w-full max-h-[500px] object-cover"
          />
        </div>

        {/* DETAILS */}

        <div className="p-8">
          <p className="text-orange-500 font-semibold">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-5 leading-7">
            {product.description}
          </p>

          {/* PRICE */}

          <div className="mt-6">
            <p className="text-4xl font-bold">
              ₹{product.price}
            </p>

            <p className="text-green-600 mt-2">
              In Stock
            </p>
          </div>

          {/* SIZE */}

          <div className="mt-8">
            <h3 className="font-bold text-lg mb-3">
              Select Size
            </h3>

            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={`border px-4 py-2 rounded-lg transition ${selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {selectedSize && (
              <p className="mt-3 text-green-600">
                Selected Size: {selectedSize}
              </p>
            )}
          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 mt-10">
            <button
              onClick={() =>
                addToCart(product)
              }
              className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            <button className="border px-8 py-4 rounded-xl hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>

          {/* EXTRA INFO */}

          <div className="mt-10 border-t pt-6 text-gray-600 space-y-3">
            <p>🚚 Free delivery available</p>

            <p>🔄 7 days return policy</p>

            <p>⭐ Premium quality product</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;