import { Link } from "react-router-dom";
import useCartStore, {
  cartItemCount,
} from "../store/useCartStore";

function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const count = cartItemCount(cart);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link
        to="/"
        className="text-3xl font-bold text-orange-500"
      >
        Velora
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>

        <Link
          to="/cart"
          className="relative hover:text-orange-400 transition"
        >
          Cart
          {count > 0 && (
            <span className="ml-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-bold bg-orange-500 text-white rounded-full">
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
