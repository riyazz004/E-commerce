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
    // Only guard on first visit — not after clearCart() during place order
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-6">
            Checkout
          </h2>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">
              Delivery Address
            </h3>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-1"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mb-3">
                {errors.name}
              </p>
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-1"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mb-3">
                {errors.phone}
              </p>
            )}

            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-1"
            />

            {errors.address && (
              <p className="text-red-500 text-sm">
                {errors.address}
              </p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">
              Payment Method
            </h3>

            <div className="space-y-3">
              <label className="flex gap-2 border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />
                Cash on Delivery
              </label>

              <label className="flex gap-2 border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />
                UPI
              </label>

              <label className="flex gap-2 border p-3 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Card"
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
                className="w-full border p-3 rounded mt-4"
              />
            )}

            {paymentMethod === "Card" && (
              <div className="space-y-3 mt-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardData.cardNumber}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      cardNumber:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded"
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
                    className="border p-3 rounded"
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
                    className="border p-3 rounded"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleOrder}
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700"
          >
            Confirm Order
          </button>

          <Link to="/cart">
            <button
              type="button"
              className="w-full mt-4 border py-3 rounded-lg hover:bg-gray-100"
            >
              Back to Cart
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-2xl font-bold mb-5">
            Order Summary
          </h3>

          <div className="space-y-4">
            {cart.map((item) => {
              const qty = item.quantity || 1;

              return (
                <div
                  key={item.cartLineId}
                  className="flex items-center gap-4 border-b pb-4"
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
                    className="w-20 h-20 object-cover rounded shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">
                      {item.name}
                    </h4>

                    {item.size && (
                      <p className="text-sm text-gray-500">
                        Size: {item.size}
                      </p>
                    )}

                    <p className="text-gray-500">
                      ₹{item.price} × {qty}
                    </p>
                  </div>

                  <p className="font-semibold shrink-0">
                    ₹{item.price * qty}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between text-lg">
            <span>Total</span>
            <span className="font-bold">
              ₹{total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
