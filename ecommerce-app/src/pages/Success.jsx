import { Link } from "react-router-dom";

function Success() {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-6">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg text-center w-full max-w-md">
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">
          ✅
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-3 sm:mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 text-sm sm:text-base">
          Your order will arrive on:
        </p>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 sm:mt-3">
          {deliveryDate.toDateString()}
        </h2>

        <Link to="/" className="block mt-5 sm:mt-6">
          <button
            type="button"
            className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-sm sm:text-base"
          >
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
