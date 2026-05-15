import useCartStore from "../store/useCartStore";

function CartItem({ item }) {
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  return (
    <div className="border p-4 rounded flex justify-between">
      <div>
        <h2 className="font-bold">
          {item.name}
        </h2>

        <p>₹{item.price}</p>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;