import { create } from "zustand";
import { persist } from "zustand/middleware";

const lineId = (productId, size = "") =>
  `${productId}-${size || "default"}`;

export const productLineId = lineId;

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product, { size = "" } = {}) =>
        set((state) => {
          const cartLineId = lineId(product.id, size);
          const existing = state.cart.find(
            (item) => item.cartLineId === cartLineId
          );

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.cartLineId === cartLineId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                cartLineId,
                size: size || null,
                quantity: 1,
              },
            ],
          };
        }),

      removeFromCart: (cartLineId) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.cartLineId !== cartLineId
          ),
        })),

      updateQuantity: (cartLineId, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return {
              cart: state.cart.filter(
                (item) => item.cartLineId !== cartLineId
              ),
            };
          }

          return {
            cart: state.cart.map((item) =>
              item.cartLineId === cartLineId
                ? { ...item, quantity }
                : item
            ),
          };
        }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "velora-cart",
      version: 1,
      migrate: (persisted) => {
        if (!persisted?.cart?.length) {
          return persisted;
        }

        return {
          ...persisted,
          cart: persisted.cart.map((item) => {
            if (item.cartLineId) {
              return item;
            }

            const size = item.size || "";
            return {
              ...item,
              cartLineId: lineId(item.id, size),
              quantity: item.quantity || 1,
            };
          }),
        };
      },
    }
  )
);

export const cartItemCount = (cart) =>
  cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

export const cartTotal = (cart) =>
  cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

export default useCartStore;
