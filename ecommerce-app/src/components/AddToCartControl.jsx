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
      className="w-5 h-5"
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
        className={`w-full flex items-center justify-center gap-2 font-semibold rounded-xl transition ${
          isLarge ? "py-4 text-lg" : "py-3"
        } ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-amber-400 hover:bg-amber-500 text-black"
        }`}
      >
        <CartIcon />
        Add to Cart
      </button>
    );
  }

  return (
    <div
      className={`flex items-center justify-center w-full gap-6 ${
        isLarge ? "py-3" : "py-2.5"
      }`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-full border-2 border-zinc-800 text-zinc-800 hover:bg-zinc-100 transition ${
          isLarge ? "w-11 h-11 text-xl" : "w-9 h-9 text-lg"
        }`}
      >
        −
      </button>

      <span
        className={`font-bold text-zinc-900 tabular-nums ${
          isLarge ? "text-2xl min-w-[2rem] text-center" : "text-xl min-w-[1.5rem] text-center"
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-full border-2 border-zinc-800 text-zinc-800 hover:bg-zinc-100 transition ${
          isLarge ? "w-11 h-11 text-xl" : "w-9 h-9 text-lg"
        }`}
      >
        +
      </button>
    </div>
  );
}

export default AddToCartControl;
