const products = [
  {
    id: 1,
    name: "Men Hoodie",
    category: "Fashion",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    description: "Comfortable cotton hoodie",
  },

  {
    id: 2,
    name: "Oversized T-Shirt",
    category: "Fashion",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
    description: "Trendy oversized t-shirt",
  },

  {
    id: 3,
    name: "Denim Jacket",
    category: "Fashion",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e",
    description: "Stylish denim jacket",
  },

  {
    id: 4,
    name: "Formal Shirt",
    category: "Fashion",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    description: "Elegant formal shirt",
  },

  {
    id: 5,
    name: "Cargo Pants",
    category: "Fashion",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    description: "Modern fit cargo pants",
  },

  {
    id: 6,
    name: "Sneakers",
    category: "Shoes",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Comfortable casual sneakers",
  },

  {
    id: 7,
    name: "Running Shoes",
    category: "Shoes",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    description: "Lightweight running shoes",
  },

  {
    id: 8,
    name: "Sports Shoes",
    category: "Shoes",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    description: "Premium sports shoes",
  },

  {
    id: 9,
    name: "Canvas Shoes",
    category: "Shoes",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    description: "Classic canvas shoes",
  },

  {
    id: 10,
    name: "White Sneakers",
    category: "Shoes",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    description: "Stylish white sneakers",
  },

  {
    id: 11,
    name: "Backpack",
    category: "Accessories",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
    description: "Travel backpack",
  },

  {
    id: 12,
    name: "Handbag",
    category: "Accessories",
    price: 2599,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Stylish women handbag",
  },

  {
    id: 13,
    name: "Wrist Watch",
    category: "Accessories",
    price: 4499,
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    description: "Luxury wrist watch",
  },

  {
    id: 14,
    name: "Sunglasses",
    category: "Accessories",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    description: "UV protection sunglasses",
  },

  {
    id: 15,
    name: "Leather Belt",
    category: "Accessories",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc",
    description: "Premium leather belt",
  },

  {
    id: 16,
    name: "Winter Jacket",
    category: "Winter",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    description: "Warm winter jacket",
  },

  {
    id: 17,
    name: "Sweatshirt",
    category: "Winter",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
    description: "Warm cotton sweatshirt",
  },

  {
    id: 18,
    name: "Winter Coat",
    category: "Winter",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
    description: "Heavy winter coat",
  },

  {
    id: 19,
    name: "Beanie",
    category: "Winter",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    description: "Warm winter beanie",
  },

  {
    id: 20,
    name: "Winter Sweater",
    category: "Winter",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    description: "Soft winter sweater",
  },

  {
    id: 21,
    name: "Polo T-Shirt",
    category: "Fashion",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Premium polo t-shirt",
  },

  {
    id: 22,
    name: "Casual Shorts",
    category: "Fashion",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    description: "Comfortable casual shorts",
  },

  {
    id: 23,
    name: "Cap",
    category: "Accessories",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee",
    description: "Stylish summer cap",
  },

  {
    id: 24,
    name: "Track Pants",
    category: "Fashion",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    description: "Comfortable track pants",
  },

  {
    id: 25,
    name: "Flip Flops",
    category: "Shoes",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1608256246200-53e8b47b2f80",
    description: "Beach flip flops",
  },
];

export default products;