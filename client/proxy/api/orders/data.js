const fs = require('fs');

let products = [
  {
    id: 1,
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    rating: 4.5,
    number_of_reviews: 12,
    price: 89.99,
    number_in_stock: 10,
    created_at: '2000-01-01T00:00:00+00:00',
  },
  {
    id: 2,
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    rating: 4.0,
    number_of_reviews: 8,
    price: 599.99,
    number_in_stock: 7,
    created_at: '2000-01-01T00:00:00+00:00',
  },
  {
    id: 3,
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    brand: 'Cannon',
    category: 'Electronics',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    rating: 3,
    number_of_reviews: 12,
    price: 929.99,
    number_in_stock: 5,
    created_at: '2000-01-01T00:00:00+00:00',
  },
  {
    id: 4,
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    brand: 'Sony',
    category: 'Electronics',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    rating: 5,
    number_of_reviews: 12,
    price: 399.99,
    number_in_stock: 11,
    created_at: '2000-01-01T00:00:00+00:00',
  },
  {
    id: 5,
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    brand: 'Logitech',
    category: 'Electronics',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    rating: 3.5,
    number_of_reviews: 10,
    price: 49.99,
    number_in_stock: 10,
    created_at: '2000-01-01T00:00:00+00:00',
  },
  {
    id: 6,
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    brand: 'Amazon',
    category: 'Electronics',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    rating: 4,
    number_of_reviews: 12,
    price: 29.99,
    number_in_stock: 0,
    created_at: '2000-01-01T00:00:00+00:00',
  },
];

const getProducts = () => products;

const addProduct = product => {
  const newProduct = {
    ...product,
    id: products[products.length - 1].id + 1,
    rating: 0,
    number_of_reviews: 0,
    created_at: new Date().toISOString(),
  };

  products = [...products, newProduct];

  return newProduct;
};

const updateProduct = product => {
  products = products.map(prod => (prod.id === product.id ? product : prod));

  return product;
};

const deleteProduct = id => {
  const bookmarkToDelete = products.find(product => product.id === id);
  products = products.filter(bookmark => bookmark.id !== bookmarkToDelete.id);
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
