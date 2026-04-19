export const mockShops = [
  {
    id: 1,
    name: "Global Tech Store",
    description: "Electronics and gadgets worldwide",
    rating: 4.8,
    reviews: 1250,
    location: {
      address: "123 Tech Street, Silicon Valley, CA",
      coordinates: { lat: 37.3861, lng: -122.0839 },
      country: "USA"
    },
    verified: true,
    online: true,
    avatar: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 2,
    name: "Fashion Hub London",
    description: "Premium fashion and accessories",
    rating: 4.6,
    reviews: 890,
    location: {
      address: "45 Oxford Street, London, UK",
      coordinates: { lat: 51.5155, lng: -0.1426 },
      country: "UK"
    },
    verified: true,
    online: true,
    avatar: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 3,
    name: "Tokyo Home & Living",
    description: "Quality home goods and furniture",
    rating: 4.9,
    reviews: 2100,
    location: {
      address: "2-8-1 Shibuya, Tokyo, Japan",
      coordinates: { lat: 35.6762, lng: 139.6503 },
      country: "Japan"
    },
    verified: true,
    online: false,
    avatar: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 4,
    name: "Paris Beauty Boutique",
    description: "Cosmetics and skincare products",
    rating: 4.7,
    reviews: 1580,
    location: {
      address: "78 Champs-Élysées, Paris, France",
      coordinates: { lat: 48.8698, lng: 2.3078 },
      country: "France"
    },
    verified: true,
    online: true,
    avatar: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 5,
    name: "Sydney Sports Gear",
    description: "Sports equipment and activewear",
    rating: 4.5,
    reviews: 670,
    location: {
      address: "120 George Street, Sydney, NSW",
      coordinates: { lat: -33.8688, lng: 151.2093 },
      country: "Australia"
    },
    verified: true,
    online: true,
    avatar: "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];

export const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    category: "Electronics",
    price: 199.99,
    currency: "USD",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
    shopId: 1,
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 349.99,
    currency: "USD",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300",
    shopId: 1,
    inStock: true
  },
  {
    id: 3,
    name: "Designer Handbag",
    category: "Fashion",
    price: 450.00,
    currency: "GBP",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300",
    shopId: 2,
    inStock: true
  },
  {
    id: 4,
    name: "Leather Jacket",
    category: "Fashion",
    price: 299.99,
    currency: "GBP",
    image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=300",
    shopId: 2,
    inStock: true
  },
  {
    id: 5,
    name: "Modern Sofa Set",
    category: "Home & Living",
    price: 89000,
    currency: "JPY",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=300",
    shopId: 3,
    inStock: true
  },
  {
    id: 6,
    name: "Premium Skincare Set",
    category: "Beauty",
    price: 120.00,
    currency: "EUR",
    image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=300",
    shopId: 4,
    inStock: true
  },
  {
    id: 7,
    name: "Running Shoes Elite",
    category: "Sports",
    price: 180.00,
    currency: "AUD",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300",
    shopId: 5,
    inStock: true
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 45.00,
    currency: "AUD",
    image: "https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=300",
    shopId: 5,
    inStock: true
  }
];

export const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
  "Food & Beverages"
];
