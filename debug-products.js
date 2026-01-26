// Debug script to check localStorage products
// Run this in browser console to debug product storage

console.log('=== DEBUGGING PRODUCTS ===');

// Check if localStorage has products
const storedProducts = localStorage.getItem('avenzo_products');
console.log('Raw localStorage data:', storedProducts);

if (storedProducts) {
  try {
    const products = JSON.parse(storedProducts);
    console.log('Parsed products:', products);
    console.log('Number of products:', products.length);
    
    products.forEach((product, index) => {
      console.log(`Product ${index + 1}:`, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        images: product.images?.length || 0,
        category: product.category
      });
    });
  } catch (e) {
    console.error('Error parsing products:', e);
  }
} else {
  console.log('No products found in localStorage');
}

// Test adding a sample product
const testProduct = {
  id: Date.now().toString(),
  name: "Test Product",
  price: 29.99,
  image: "https://via.placeholder.com/300",
  images: ["https://via.placeholder.com/300"],
  description: "Test product description",
  category: "Test",
  inStock: true,
  rating: 4.5,
  reviews: 10
};

console.log('Adding test product:', testProduct);

const existingProducts = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
const updatedProducts = [...existingProducts, testProduct];
localStorage.setItem('avenzo_products', JSON.stringify(updatedProducts));

console.log('Test product added. New count:', updatedProducts.length);

// Dispatch event to refresh components
window.dispatchEvent(new CustomEvent('productsUpdated'));
console.log('Products updated event dispatched');