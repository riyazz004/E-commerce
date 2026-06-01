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
    <div className="flex items-center justify-between border rounded-lg p-4 gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <img
          src={optimizeImageUrl(item.image, 96)}
          alt={item.name}
          width={96}
          height={96}
          decoding="async"
          className="w-24 h-24 object-cover rounded-lg shrink-0"
        />

        <div className="min-w-0">
          <h2 className="font-semibold text-lg truncate">
            {item.name}
          </h2>

          {item.size && (
            <p className="text-sm text-gray-500">
              Size: {item.size}
            </p>
          )}

          <p className="text-gray-500">
            ₹{item.price} × {qty} = ₹{item.price * qty}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex items-center gap-2 border rounded-lg">
          <button
            type="button"
            onClick={() =>
              updateQuantity(item.cartLineId, qty - 1)
            }
            className="px-3 py-1 hover:bg-gray-100"
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
            className="px-3 py-1 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeFromCart(item.cartLineId)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
