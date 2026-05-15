import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Fashion",
    "Shoes",
    "Accessories",
    "Winter",
  ];

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <div>
      {/* HERO SECTION */}

      <div className="bg-gradient-to-r from-black via-gray-900 to-orange-700 text-white p-10 md:p-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Your Style
          </h1>

          <p className="mt-5 text-gray-300 text-lg">
            Fashion that matches your vibe.
            Trendy collections at affordable
            prices.
          </p>

          {/* SEARCH */}

          <div className="mt-8 flex max-w-2xl">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-white text-black p-4 rounded-l-lg  outline-none"
            />

            <button className="bg-orange-500 text-white px-6 rounded-r-lg">
              Search
            </button>
          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 mt-8 flex-wrap">
            <button className="bg-orange-500 px-6 py-3 rounded-lg font-semibold">
              Shop Now
            </button>

            <button className="border border-white px-6 py-3 rounded-lg">
              Today's Deals
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY SECTION */}

      <div className="p-5 flex gap-3 flex-wrap bg-white shadow-sm">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-5 py-2 rounded-full border cursor-pointer transition duration-300 ${selectedCategory === category
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-400 hover:bg-gray-100"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;