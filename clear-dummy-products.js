// Script to clear dummy products from localStorage
// Run this in browser console if you have old dummy products

console.log('=== CLEARING DUMMY PRODUCTS ===');

// Check current products
const currentProducts = localStorage.getItem('avenzo_products');
if (currentProducts) {
  try {
    const products = JSON.parse(currentProducts);
    console.log('Current products:', products.length);
    
    // Filter out dummy products (IDs 1-8 are dummy products)
    const adminProducts = products.filter(product => {
      const isDummy = ['1', '2', '3', '4', '5', '6', '7', '8'].includes(product.id);
      if (isDummy) {
        console.log('Removing dummy product:', product.name);
      }
      return !isDummy;
    });
    
    // Save only admin products
    localStorage.setItem('avenzo_products', JSON.stringify(adminProducts));
    
    console.log('Dummy products removed. Remaining products:', adminProducts.length);
    
    // Dispatch event to refresh components
    window.dispatchEvent(new CustomEvent('productsUpdated'));
    console.log('Products updated event dispatched');
    
    if (adminProducts.length === 0) {
      console.log('No admin products found. Only Cloudinary-uploaded products will be displayed.');
    }
    
  } catch (e) {
    console.error('Error processing products:', e);
  }
} else {
  console.log('No products found in localStorage');
}

console.log('=== CLEANUP COMPLETE ===');