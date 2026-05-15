import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";

function Navbar() {
  const cart = useCartStore((state) => state.cart);

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

        <Link to="/cart">
          Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;