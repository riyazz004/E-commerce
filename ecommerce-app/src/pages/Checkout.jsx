import { useState } from "react";

function Checkout() {
  const [ordered, setOrdered] = useState(false);

  const deliveryDate = new Date();
  deliveryDate.setDate(
    deliveryDate.getDate() + 5
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
        {!ordered ? (
          <>
            <h1 className="text-4xl font-bold mb-4">
              Confirm Your Order
            </h1>

            <p className="text-gray-600 mb-8">
              Your items are ready to be shipped.
            </p>

            <button
              onClick={() => setOrdered(true)}
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl text-lg"
            >
              Confirm Order
            </button>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">
              ✅
            </div>

            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Order Confirmed!
            </h1>

            <p className="text-gray-700 text-lg">
              Your order will arrive on:
            </p>

            <p className="text-2xl font-semibold mt-3">
              {deliveryDate.toDateString()}
            </p>

            <p className="text-gray-500 mt-6">
              Thank you for shopping with Velora.
            </p>

            <a href="/">
              <button className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl">
                Return to Home
              </button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;