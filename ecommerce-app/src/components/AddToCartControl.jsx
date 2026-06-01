import useCartStore, {
  productLineId,
} from "../store/useCartStore";

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function AddToCartControl({
  product,
  size = "",
  disabled = false,
  onDisabledClick,
  sizeVariant = "default",
}) {
  const cartLineId = productLineId(product.id, size);

  const quantity = useCartStore((state) => {
    const item = state.cart.find(
      (i) => i.cartLineId === cartLineId
    );
    return item?.quantity || 0;
  });

  const addToCart = useCartStore(
    (state) => state.addToCart
  );
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const isLarge = sizeVariant === "large";

  const handleAdd = () => {
    if (disabled) {
      onDisabledClick?.();
      return;
    }
    addToCart(product, { size });
  };

  const handleDecrease = () => {
    updateQuantity(cartLineId, quantity - 1);
  };

  const handleIncrease = () => {
    if (disabled) {
      onDisabledClick?.();
      return;
    }
    if (quantity === 0) {
      addToCart(product, { size });
    } else {
      updateQuantity(cartLineId, quantity + 1);
    }
  };

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 font-semibold rounded-lg sm:rounded-xl transition text-sm sm:text-base ${
          isLarge ? "py-3.5 sm:py-4 text-base sm:text-lg" : "py-2.5 sm:py-3"
        } ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-black"
        }`}
      >
        <CartIcon />
        <span className="truncate">Add to Cart</span>
      </button>
    );
  }

  return (
    <div
      className={`flex items-center justify-center w-full gap-4 sm:gap-6 ${
        isLarge ? "py-2.5 sm:py-3" : "py-2 sm:py-2.5"
      }`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-full border-2 border-zinc-800 text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200 transition touch-manipulation ${
          isLarge
            ? "w-10 h-10 sm:w-11 sm:h-11 text-lg sm:text-xl"
            : "w-8 h-8 sm:w-9 sm:h-9 text-base sm:text-lg"
        }`}
      >
        −
      </button>

      <span
        className={`font-bold text-zinc-900 tabular-nums ${
          isLarge
            ? "text-xl sm:text-2xl min-w-[1.5rem] sm:min-w-[2rem] text-center"
            : "text-lg sm:text-xl min-w-[1.25rem] sm:min-w-[1.5rem] text-center"
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-full border-2 border-zinc-800 text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200 transition touch-manipulation ${
          isLarge
            ? "w-10 h-10 sm:w-11 sm:h-11 text-lg sm:text-xl"
            : "w-8 h-8 sm:w-9 sm:h-9 text-base sm:text-lg"
        }`}
      >
        +
      </button>
    </div>
  );
}

export default AddToCartControl;
