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
    <div className="w-full">
      <div className="bg-gradient-to-r from-black via-gray-900 to-orange-700 text-white px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Discover Your Style
          </h1>

          <p className="mt-3 sm:mt-5 text-gray-300 text-base sm:text-lg max-w-xl">
            Fashion that matches your vibe.
            Trendy collections at affordable prices.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row max-w-2xl gap-2 sm:gap-0">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-white text-black p-3 sm:p-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none outline-none text-base"
            />

            <button
              type="button"
              className="bg-orange-500 text-white px-6 py-3 sm:py-0 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-medium shrink-0"
            >
              Search
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              type="button"
              className="bg-orange-500 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
            >
              Shop Now
            </button>

            <button
              type="button"
              className="border border-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base"
            >
              Today&apos;s Deals
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 overflow-x-auto scrollbar-thin">
          <div className="flex gap-2 sm:gap-3 w-max sm:w-auto sm:flex-wrap min-w-full sm:min-w-0">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`px-4 py-2 sm:px-5 rounded-full border cursor-pointer transition duration-300 text-sm sm:text-base whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-400 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
