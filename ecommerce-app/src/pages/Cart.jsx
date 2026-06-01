import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import useCartStore, {
  cartTotal,
} from "../store/useCartStore";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const total = cartTotal(cart);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-5 sm:px-6 sm:py-8 pb-28 md:pb-8">
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Your cart is empty.
            </p>
            <Link
              to="/"
              className="inline-block bg-black text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-800 text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.cartLineId}
                  item={item}
                />
              ))}
            </div>

            <div className="hidden md:flex mt-6 flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">
                Total: ₹{total}
              </h2>

              <Link to="/checkout">
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-40">
          <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-lg font-bold">₹{total}</p>
            </div>
            <Link to="/checkout" className="flex-1 max-w-[200px]">
              <button
                type="button"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-sm"
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
