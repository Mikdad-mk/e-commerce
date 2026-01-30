# How to Get PayPal Credentials - Visual Guide

## 🎯 Your Mission: Get Client ID and Secret

You need 2 things:
1. **Client ID** (public, goes in NEXT_PUBLIC_PAYPAL_CLIENT_ID)
2. **Secret** (private, goes in PAYPAL_CLIENT_SECRET)

---

## 📍 Step 1: Go to PayPal Developer

**URL:** https://developer.paypal.com

**What you'll see:**
- Big "Log in to Dashboard" button (top right)
- Or "Get Started" if not logged in

**Action:** Click "Log in to Dashboard"

---

## 📍 Step 2: Sign In

**Use your PayPal account:**
- Have a PayPal account? Sign in
- Don't have one? Click "Sign Up" first

**After signing in:**
- You'll see the Developer Dashboard
- Accept any agreements if prompted

---

## 📍 Step 3: Navigate to Apps

**In the left sidebar, click:**
- "Apps & Credentials"

**At the top, make sure:**
- Toggle is set to **"Sandbox"** (not Live)
- This is for testing with fake money

---

## 📍 Step 4: Create App

**Click the blue button:**
- "Create App"

**Fill in the form:**
```
App Name: Avenzo Store
App Type: Merchant (select this option)
```

**Click:** "Create App"

---

## 📍 Step 5: Copy Your Credentials

**You'll see a page with your app details:**

### Client ID
```
Client ID: AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
```
**Action:** Click the copy icon or select and copy

### Secret
```
Secret: •••••••••••••••• [Show]
```
**Action:** 
1. Click "Show"
2. Copy the revealed secret

---

## 📍 Step 6: Add to .env File

**Open:** `e-commerce/.env`

**Find these lines:**
```env
# PayPal Configuration (Sandbox for testing)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
```

**Replace with your actual values:**
```env
# PayPal Configuration (Sandbox for testing)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
PAYPAL_CLIENT_SECRET=EGnHDxD_qRPdaLdZz8iCr8N7_MzF-YHPTkjs6NKYQvQSBngp4PTTVWkPZRbL6PI7CUxJ9z03NnKJj0Gg
```

**Save the file!**

---

## 📍 Step 7: Restart Server

**In your terminal:**
```bash
# Press Ctrl+C to stop
# Then restart:
npm run dev
```

---

## ✅ Verify It's Working

### Check 1: Server Starts
```
✓ Ready in 2.3s
○ Local: http://localhost:3000
```

### Check 2: No Errors
- No PayPal-related errors in terminal
- No console errors in browser

### Check 3: PayPal Button Shows
1. Go to http://localhost:3000/shop
2. Add product to cart
3. Go to checkout
4. Enter email
5. **You should see PayPal button!** ✅

---

## 🧪 Test Payment

### Get Test Account

**Go to:** https://developer.paypal.com/dashboard/accounts

**You'll see:**
- Personal Account (for buyers)
- Business Account (for sellers)

**Click on Personal Account:**
- Click "..." menu
- Click "View/Edit Account"
- **Copy the email and password**

### Make Test Purchase

1. **Add products** to cart
2. **Go to checkout**
3. **Enter your email**
4. **Click PayPal button**
5. **Login** with test account email/password
6. **Click "Pay Now"**
7. **Success!** You'll be redirected to success page

---

## 🎯 What Each Credential Does

### Client ID (Public)
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxj...
```
- Starts with `NEXT_PUBLIC_` so it's visible in browser
- Used to initialize PayPal buttons
- Safe to expose (it's public)
- Identifies your app to PayPal

### Secret (Private)
```env
PAYPAL_CLIENT_SECRET=EGnHD...
```
- NO `NEXT_PUBLIC_` prefix = server-side only
- Used for API authentication
- NEVER expose in browser
- Proves you're authorized

---

## 🔒 Security Notes

### ✅ Safe:
- Client ID in browser code
- Client ID in GitHub (if public repo)
- Sharing Client ID with team

### ❌ Never:
- Expose Secret in browser
- Commit Secret to public GitHub
- Share Secret publicly
- Use Live credentials in development

---

## 🆘 Common Issues

### "Client ID is invalid"
**Solution:**
- Make sure you copied the full ID
- Check for extra spaces
- Verify you're in Sandbox mode
- Try creating a new app

### "Secret is invalid"
**Solution:**
- Click "Show" to reveal secret
- Copy the entire secret
- Check for line breaks
- Regenerate secret if needed

### "PayPal button not showing"
**Solution:**
```bash
# 1. Check .env file has both values
# 2. Restart server
npm run dev
# 3. Hard refresh browser (Ctrl+Shift+R)
# 4. Check browser console for errors
```

### "Payment not completing"
**Solution:**
- Use sandbox test account (not your real PayPal)
- Check test account has funds (it should by default)
- Try different test account
- Check PayPal dashboard for transaction status

---

## 📱 Quick Reference

### URLs You Need:
```
Dashboard: https://developer.paypal.com/dashboard
Apps: https://developer.paypal.com/dashboard/applications/sandbox
Accounts: https://developer.paypal.com/dashboard/accounts
```

### What Goes Where:
```env
# In .env file:
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret
```

### Test Cards:
```
Visa: 4032039974960680
Mastercard: 5425233430109903
Amex: 374245455400126
Expiry: Any future date
CVV: Any 3 digits
```

---

## 🎉 Success Checklist

- [ ] Created PayPal developer account
- [ ] Created sandbox app
- [ ] Copied Client ID to .env
- [ ] Copied Secret to .env
- [ ] Saved .env file
- [ ] Restarted dev server
- [ ] PayPal button appears on checkout
- [ ] Test payment successful
- [ ] Order confirmation page shows
- [ ] Cart is cleared after payment

---

## 🚀 You're Connected!

Once all checkboxes are checked, you're ready to accept PayPal payments!

**Next:** Test different scenarios (cancel payment, different cards, etc.)

**Later:** When ready for real money, switch to Live mode and get Live credentials.

---

## 📚 Need More Help?

- **Quick Start:** `PAYPAL-QUICK-START.md`
- **Full Setup:** `PAYPAL-SETUP.md`
- **PayPal Docs:** https://developer.paypal.com/docs

---

**Remember:** You're using Sandbox mode - no real money involved! Test freely! 🎮
