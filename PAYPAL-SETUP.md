# PayPal Payment Integration Setup Guide

## Overview
Complete guide to set up PayPal payments for your e-commerce platform with sandbox testing.

---

## Step 1: Create PayPal Developer Account

### Sign Up
1. Go to https://developer.paypal.com
2. Click "Log in to Dashboard"
3. Sign in with your PayPal account (or create one)
4. Accept the developer agreement

---

## Step 2: Create Sandbox App

### Access Dashboard
1. Go to https://developer.paypal.com/dashboard
2. Click "Apps & Credentials" in the left sidebar
3. Make sure you're in **Sandbox** mode (toggle at top)

### Create App
1. Click "Create App" button
2. Enter App Name: `Avenzo E-Commerce`
3. Select App Type: **Merchant**
4. Click "Create App"

---

## Step 3: Get Your API Credentials

### Client ID
1. On your app page, find "Client ID"
2. Copy the value (starts with `A...`)

### Secret
1. Click "Show" next to "Secret"
2. Copy the secret value

### Add to .env
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_CLIENT_SECRET=your_secret_here
```

**Example:**
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
PAYPAL_CLIENT_SECRET=EGnHDxD_qRPdaLdZz8iCr8N7_MzF-YHPTkjs6NKYQvQSBngp4PTTVWkPZRbL6PI7CUxJ9z03NnKJj0Gg
```

---

## Step 4: Test the Integration

### Restart Development Server
```bash
npm run dev
```

### Test Checkout Flow
1. Go to http://localhost:3000/shop
2. Add products to cart
3. Go to cart: http://localhost:3000/cart
4. Click "Proceed to Checkout"
5. Enter your email
6. Click PayPal button

### Use Sandbox Test Account

PayPal will provide test accounts automatically, or create one:

1. Go to https://developer.paypal.com/dashboard
2. Click "Sandbox" → "Accounts"
3. Use the "Personal" account for testing

**Test Account Credentials:**
- Email: Usually shown in sandbox accounts list
- Password: Usually shown in sandbox accounts list

Or use these test cards directly in PayPal checkout:
- **Visa:** 4032039974960680
- **Mastercard:** 5425233430109903
- **Amex:** 374245455400126

---

## Step 5: Features Included

### ✅ PayPal Checkout
- Secure PayPal payment processing
- Pay with PayPal account
- Pay with credit/debit card (no PayPal account needed)
- Mobile-optimized checkout
- Worldwide currency support

### ✅ Payment Methods
- PayPal Balance
- Credit Cards (Visa, Mastercard, Amex, Discover)
- Debit Cards
- Bank Accounts (in some countries)

### ✅ Security
- PCI DSS compliant
- Buyer and seller protection
- Encrypted transactions
- Fraud detection

---

## API Endpoints Created

### POST /api/paypal/create-order
Creates a PayPal order

**Request:**
```json
{
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 29.99,
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "orderID": "5O190127TN364715T"
}
```

### POST /api/paypal/capture-order
Captures payment for an order

**Request:**
```json
{
  "orderID": "5O190127TN364715T"
}
```

**Response:**
```json
{
  "order": {
    "id": "5O190127TN364715T",
    "status": "COMPLETED",
    ...
  }
}
```

---

## Testing Scenarios

### 1. Successful Payment
1. Add products to cart
2. Go to checkout
3. Enter email
4. Click PayPal button
5. Login with sandbox account
6. Complete payment
7. Verify redirect to success page
8. Check cart is empty

### 2. Cancelled Payment
1. Start checkout
2. Click PayPal button
3. Click "Cancel and return"
4. Verify return to cart
5. Cart should still have items

### 3. Payment Error
1. Use invalid credentials
2. Verify error handling
3. User can retry

---

## Going Live (Production)

### When Ready:

1. **Complete PayPal Business Account Setup**
   - Verify business information
   - Add bank account
   - Complete identity verification

2. **Switch to Live Mode**
   - Go to https://developer.paypal.com/dashboard
   - Toggle from "Sandbox" to "Live"
   - Create new app or use existing

3. **Get Live Credentials**
   - Copy Live Client ID
   - Copy Live Secret
   - Update `.env` with live credentials

4. **Update Environment**
   ```env
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=live_client_id
   PAYPAL_CLIENT_SECRET=live_secret
   ```

5. **Test with Real Money**
   - Use small amount first
   - Verify full flow
   - Check funds in PayPal account

---

## Troubleshooting

### "PayPal button not showing"
- Check `NEXT_PUBLIC_PAYPAL_CLIENT_ID` in `.env`
- Restart development server
- Check browser console for errors

### "Failed to create order"
- Verify both Client ID and Secret are set
- Check API credentials are for correct mode (Sandbox/Live)
- Check server logs for detailed errors

### "Payment not completing"
- Check sandbox account has funds
- Verify order amount is valid
- Check PayPal dashboard for transaction status

### "CORS errors"
- PayPal handles CORS automatically
- If issues persist, check app settings in PayPal dashboard

---

## Security Best Practices

### ✅ DO:
- Keep secret in environment variables
- Use different credentials for dev/prod
- Never commit secrets to Git
- Validate orders server-side
- Log transactions

### ❌ DON'T:
- Don't expose secret in client code
- Don't skip order validation
- Don't trust client-side amounts
- Don't store card details
- Don't share API credentials

---

## Environment Variables Summary

Your `.env` file should have:

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret
```

**Note:** 
- `NEXT_PUBLIC_` prefix makes it available in browser
- Secret without prefix stays server-side only

---

## Payment Flow

1. **Customer adds items to cart**
2. **Goes to checkout page**
3. **Enters email address**
4. **Clicks PayPal button**
5. **Redirected to PayPal**
6. **Logs in / pays with card**
7. **Approves payment**
8. **Redirected back to site**
9. **Order captured**
10. **Success page shown**
11. **Cart cleared**

---

## Support Resources

### PayPal Documentation
- Developer Dashboard: https://developer.paypal.com/dashboard
- Docs: https://developer.paypal.com/docs
- API Reference: https://developer.paypal.com/api/rest/
- Sandbox Testing: https://developer.paypal.com/tools/sandbox/

### PayPal Support
- Developer Support: https://developer.paypal.com/support/
- Community: https://www.paypal-community.com/
- Status: https://www.paypal-status.com/

---

## Summary

You now have a fully functional PayPal payment integration:
- ✅ Secure checkout with PayPal
- ✅ Sandbox mode for testing
- ✅ Multiple payment methods
- ✅ Worldwide support
- ✅ Mobile optimized
- ✅ Success/cancel handling
- ✅ Cart management

Start testing with sandbox accounts and you're ready to accept payments! 💳
