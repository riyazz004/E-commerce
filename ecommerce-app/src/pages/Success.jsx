import { Link } from "react-router-dom";

function Success() {

  const deliveryDate = new Date();

  deliveryDate.setDate(
    deliveryDate.getDate() + 5
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg text-center">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600">
          Your order will arrive on:
        </p>

        <h2 className="text-2xl font-semibold mt-3">
          {deliveryDate.toDateString()}
        </h2>

        <Link to="/">
          <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
            Return to Home
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Success;