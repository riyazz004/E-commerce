import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../data/products";
import useCartStore from "../store/useCartStore";
import AddToCartControl from "../components/AddToCartControl";
import { optimizeImageUrl } from "../utils/imageUrl";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState("");

  if (!product) {
    return (
      <div className="p-10 text-2xl">
        Product not found
      </div>
    );
  }

  const needsSize = product.category === "Fashion";

  const handleBuyNow = () => {
    if (needsSize && !selectedSize) {
      setSizeError("Please select a size");
      return;
    }

    setSizeError("");
    addToCart(product, { size: selectedSize });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-10">
        <div className="p-6 flex items-center justify-center bg-gray-50">
          <img
            src={optimizeImageUrl(product.image, 600)}
            alt={product.name}
            width={600}
            height={500}
            decoding="async"
            fetchPriority="high"
            className="rounded-2xl w-full max-h-[500px] object-cover"
          />
        </div>

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

          <div className="mt-6 flex items-baseline justify-between gap-4">
            <p className="text-4xl font-bold text-amber-500">
              ₹{product.price}
            </p>

            <p className="text-green-600 font-medium">
              In Stock
            </p>
          </div>

          {needsSize && (
            <div className="mt-8">
              <h3 className="font-bold text-lg mb-3">
                Select Size
              </h3>

              <div className="flex gap-3 flex-wrap">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError("");
                    }}
                    className={`border px-4 py-2 rounded-lg transition ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {sizeError && (
                <p className="mt-3 text-red-500 text-sm">
                  {sizeError}
                </p>
              )}

              {selectedSize && (
                <p className="mt-3 text-green-600">
                  Selected Size: {selectedSize}
                </p>
              )}
            </div>
          )}

          <div className="mt-10 max-w-sm space-y-3">
            <AddToCartControl
              product={product}
              size={selectedSize}
              disabled={needsSize && !selectedSize}
              onDisabledClick={() =>
                setSizeError("Please select a size")
              }
              sizeVariant="large"
            />

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full border-2 border-zinc-800 py-4 rounded-xl font-semibold hover:bg-zinc-800 hover:text-white transition"
            >
              Buy Now
            </button>
          </div>

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
