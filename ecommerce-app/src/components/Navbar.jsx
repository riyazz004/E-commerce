import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCartStore, {
  cartItemCount,
} from "../store/useCartStore";

function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const count = cartItemCount(cart);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block py-2 md:py-0 text-base md:text-sm transition ${
      isActive
        ? "text-orange-400"
        : "hover:text-orange-400"
    }`;

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-2xl sm:text-3xl font-bold text-orange-500 shrink-0"
          >
            Velora
          </Link>

          <div className="hidden md:flex gap-6 items-center">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/cart" className={linkClass}>
              <span className="inline-flex items-center gap-1">
                Cart
                {count > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-bold bg-orange-500 text-white rounded-full">
                    {count}
                  </span>
                )}
              </span>
            </NavLink>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="relative p-2 hover:text-orange-400"
              aria-label={`Cart, ${count} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
                aria-hidden
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-0.5 text-[10px] font-bold bg-orange-500 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 rounded-lg hover:bg-zinc-800"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-zinc-800 pb-4 pt-2">
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/cart"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Cart {count > 0 && `(${count})`}
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
