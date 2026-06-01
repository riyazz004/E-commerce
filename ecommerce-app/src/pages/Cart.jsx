import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import useCartStore, {
  cartTotal,
} from "../store/useCartStore";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const total = cartTotal(cart);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Your cart is empty.
            </p>
            <Link
              to="/"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.cartLineId}
                  item={item}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">
                Total: ₹{total}
              </h2>

              <Link to="/checkout">
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
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
