import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import useCartStore, {
  cartTotal,
} from "../store/useCartStore";
import { optimizeImageUrl } from "../utils/imageUrl";

const checkoutSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Enter valid phone number"),
  address: z.string().min(5, "Address is required"),
});

function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore(
    (state) => state.clearCart
  );
  const total = cartTotal(cart);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] =
    useState("");
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = () => {
    const result =
      checkoutSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] =
          err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    if (
      paymentMethod === "UPI" &&
      !upiId
    ) {
      alert("Please enter UPI ID");
      return;
    }

    if (paymentMethod === "Card") {
      if (
        !cardData.cardNumber ||
        !cardData.expiry ||
        !cardData.cvv
      ) {
        alert("Please enter card details");
        return;
      }
    }

    setErrors({});
    navigate("/success", { replace: true });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Redirecting…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:hidden">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 hidden md:block">
              Checkout
            </h2>

            <div className="mb-5 sm:mb-6">
              <h3 className="font-semibold text-base sm:text-lg mb-3">
                Delivery Address
              </h3>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mb-1 text-base"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mb-3">
                  {errors.name}
                </p>
              )}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mb-1 text-base"
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mb-3">
                  {errors.phone}
                </p>
              )}

              <textarea
                name="address"
                placeholder="Address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mb-1 text-base resize-y min-h-[5rem]"
              />

              {errors.address && (
                <p className="text-red-500 text-sm">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="mb-5 sm:mb-6">
              <h3 className="font-semibold text-base sm:text-lg mb-3">
                Payment Method
              </h3>

              <div className="space-y-2 sm:space-y-3">
                <label className="flex gap-3 border p-3 sm:p-4 rounded-lg cursor-pointer items-center text-sm sm:text-base">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    className="shrink-0 w-4 h-4"
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />
                  Cash on Delivery
                </label>

                <label className="flex gap-3 border p-3 sm:p-4 rounded-lg cursor-pointer items-center text-sm sm:text-base">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    className="shrink-0 w-4 h-4"
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />
                  UPI
                </label>

                <label className="flex gap-3 border p-3 sm:p-4 rounded-lg cursor-pointer items-center text-sm sm:text-base">
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    className="shrink-0 w-4 h-4"
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />
                  Credit / Debit Card
                </label>
              </div>

              {paymentMethod === "UPI" && (
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) =>
                    setUpiId(e.target.value)
                  }
                  className="w-full border p-3 rounded-lg mt-4 text-base"
                />
              )}

              {paymentMethod === "Card" && (
                <div className="space-y-3 mt-4">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Card Number"
                    value={cardData.cardNumber}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        cardNumber:
                          e.target.value,
                      })
                    }
                    className="w-full border p-3 rounded-lg text-base"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          expiry:
                            e.target.value,
                        })
                      }
                      className="border p-3 rounded-lg text-base w-full"
                    />

                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          cvv:
                            e.target.value,
                        })
                      }
                      className="border p-3 rounded-lg text-base w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleOrder}
              className="w-full bg-green-600 text-white py-3 sm:py-3.5 rounded-lg text-base sm:text-lg hover:bg-green-700 active:bg-green-800 touch-manipulation"
            >
              Confirm Order
            </button>

            <Link to="/cart" className="block">
              <button
                type="button"
                className="w-full mt-3 sm:mt-4 border py-3 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
              >
                Back to Cart
              </button>
            </Link>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow order-1 lg:order-2 h-fit lg:sticky lg:top-20">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">
              Order Summary
            </h3>

            <div className="space-y-3 sm:space-y-4 max-h-[40vh] sm:max-h-none overflow-y-auto lg:overflow-visible pr-1">
              {cart.map((item) => {
                const qty = item.quantity || 1;

                return (
                  <div
                    key={item.cartLineId}
                    className="flex items-center gap-3 sm:gap-4 border-b pb-3 sm:pb-4 last:border-0"
                  >
                    <img
                      src={optimizeImageUrl(
                        item.image,
                        80
                      )}
                      alt={item.name}
                      width={80}
                      height={80}
                      decoding="async"
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base line-clamp-2">
                        {item.name}
                      </h4>

                      {item.size && (
                        <p className="text-xs sm:text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-gray-500">
                        ₹{item.price} × {qty}
                      </p>
                    </div>

                    <p className="font-semibold text-sm sm:text-base shrink-0">
                      ₹{item.price * qty}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 sm:mt-6 border-t pt-4 flex justify-between text-base sm:text-lg">
              <span>Total</span>
              <span className="font-bold">
                ₹{total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
