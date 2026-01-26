# Migration Guide: LocalStorage to MongoDB

## Overview
The e-commerce platform has been upgraded from localStorage to MongoDB for product storage.

## What Changed
- **Before**: Products stored in browser localStorage
- **After**: Products stored in MongoDB database

## Migration Steps

### If You Have Existing Products in LocalStorage

1. **Export existing products** (optional backup):
   - Open browser console on `/debug` page
   - Run: `console.log(JSON.stringify(JSON.parse(localStorage.getItem('avenzo_products')), null, 2))`
   - Copy the output to save as backup

2. **Add products to MongoDB**:
   - Go to `/admin` page
   - Re-add your products using the admin panel
   - Images will be uploaded to Cloudinary
   - Products will be saved to MongoDB

3. **Clear localStorage** (optional):
   - Go to `/debug` page
   - Click "Clear LocalStorage" button
   - Or run in console: `localStorage.removeItem('avenzo_products')`

### For New Installations
No migration needed! Just:
1. Start the server: `npm run dev`
2. Go to `/admin` and add products
3. Products automatically save to MongoDB

## Verification

### Check MongoDB Connection
Visit: `http://localhost:3000/api/test-db`

Expected response:
```json
{
  "success": true,
  "message": "MongoDB connection successful!"
}
```

### Check Products
1. **Admin Panel**: `http://localhost:3000/admin`
   - Should show all products from MongoDB

2. **Shop Page**: `http://localhost:3000/shop`
   - Should display products from MongoDB

3. **Home Page**: `http://localhost:3000/`
   - Featured Products section should show products from MongoDB

4. **Debug Page**: `http://localhost:3000/debug`
   - Shows both MongoDB products and legacy localStorage products

## Benefits of MongoDB

✅ **Persistent Storage**: Data survives browser cache clears
✅ **Scalable**: Can handle thousands of products
✅ **Accessible**: Products available across all devices
✅ **Reliable**: Professional database with backups
✅ **Fast**: Optimized queries with pagination
✅ **Searchable**: Built-in search and filter capabilities

## Troubleshooting

### Products Not Showing
1. Check MongoDB connection: `/api/test-db`
2. Verify products exist in database
3. Check browser console for errors
4. Refresh the page

### Images Not Loading
1. Verify Cloudinary credentials in `.env`
2. Check image URLs in MongoDB
3. Ensure images were uploaded to Cloudinary

### Can't Add Products
1. Check MongoDB connection
2. Verify all required fields are filled
3. Ensure at least one image is uploaded
4. Check browser console for errors

## Rollback (Not Recommended)
If you need to temporarily use localStorage:
1. The old localStorage data is still preserved
2. Visit `/debug` to see localStorage products
3. However, new features only work with MongoDB

## Support
- Check `SETUP.md` for setup instructions
- Check `CHANGES.md` for technical details
- Visit `/debug` page for diagnostic information
