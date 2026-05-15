import useCartStore from "../store/useCartStore";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold text-lg">
                        {item.name}
                      </h2>

                      <p className="text-gray-500">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Total: ₹{total}
              </h2>

              <Link to="/checkout">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;