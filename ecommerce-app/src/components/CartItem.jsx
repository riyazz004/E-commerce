import useCartStore from "../store/useCartStore";
import { optimizeImageUrl } from "../utils/imageUrl";

function CartItem({ item }) {
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const qty = item.quantity || 1;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 sm:p-4 gap-3 sm:gap-4">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <img
          src={optimizeImageUrl(item.image, 96)}
          alt={item.name}
          width={96}
          height={96}
          decoding="async"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg shrink-0"
        />

        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-base sm:text-lg line-clamp-2">
            {item.name}
          </h2>

          {item.size && (
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Size: {item.size}
            </p>
          )}

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            ₹{item.price} × {qty} = ₹{item.price * qty}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 sm:flex-col sm:items-end sm:gap-2 shrink-0 pl-[4.25rem] sm:pl-0">
        <div className="flex items-center gap-1 sm:gap-2 border rounded-lg">
          <button
            type="button"
            onClick={() =>
              updateQuantity(item.cartLineId, qty - 1)
            }
            className="px-3 py-2 sm:py-1 hover:bg-gray-100 touch-manipulation min-w-[2.5rem]"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="w-8 text-center font-medium">
            {qty}
          </span>

          <button
            type="button"
            onClick={() =>
              updateQuantity(item.cartLineId, qty + 1)
            }
            className="px-3 py-2 sm:py-1 hover:bg-gray-100 touch-manipulation min-w-[2.5rem]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeFromCart(item.cartLineId)}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded-lg text-sm touch-manipulation"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
