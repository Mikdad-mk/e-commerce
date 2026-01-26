# Stripe Payment Integration Setup Guide

## Overview
Complete guide to set up Stripe payments for your e-commerce platform with test mode.

---

## Step 1: Create Stripe Account

### Sign Up
1. Go to https://stripe.com
2. Click "Start now" or "Sign up"
3. Enter your email and create a password
4. Verify your email address

### Account Type
- Choose "Individual" or "Business" based on your needs
- For testing, either option works

---

## Step 2: Get Your API Keys

### Access Dashboard
1. Log in to https://dashboard.stripe.com
2. You'll start in **Test Mode** (toggle in top right)
3. Make sure "Test mode" is ON (shows a test mode badge)

### Get Publishable Key
1. Click "Developers" in the left sidebar
2. Click "API keys"
3. Find "Publishable key" (starts with `pk_test_`)
4. Click "Reveal test key" and copy it

### Get Secret Key
1. On the same page, find "Secret key" (starts with `sk_test_`)
2. Click "Reveal test key" and copy it
3. **IMPORTANT:** Never share or commit this key!

---

## Step 3: Add Keys to Your Project

### Update .env File
Open `e-commerce/.env` and add your keys:

```env
# Stripe Configuration (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Example:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefghijklmnopqrstuvwxyz
```

---

## Step 4: Test the Integration

### Restart Development Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Test Checkout Flow
1. Go to http://localhost:3000/shop
2. Add products to cart
3. Go to cart: http://localhost:3000/cart
4. Click "Proceed to Checkout"
5. Enter your email
6. Click "Proceed to Payment"
7. You'll be redirected to Stripe Checkout

### Use Test Card Numbers

#### Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

#### Declined Payment
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### Requires Authentication (3D Secure)
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### More Test Cards
Visit: https://stripe.com/docs/testing#cards

---

## Step 5: Set Up Webhooks (Optional but Recommended)

### Why Webhooks?
- Get notified when payments succeed/fail
- Update order status automatically
- Send confirmation emails
- Update inventory

### Install Stripe CLI
**Windows:**
```powershell
# Using Scoop
scoop install stripe

# Or download from:
# https://github.com/stripe/stripe-cli/releases
```

**Mac:**
```bash
brew install stripe/stripe-cli/stripe
```

### Login to Stripe CLI
```bash
stripe login
```

### Forward Webhooks to Local Server
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will output a webhook secret like:
```
whsec_1234567890abcdefghijklmnopqrstuvwxyz
```

### Add Webhook Secret to .env
```env
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefghijklmnopqrstuvwxyz
```

### Test Webhook
In another terminal:
```bash
stripe trigger checkout.session.completed
```

---

## Step 6: Verify Everything Works

### Checklist
- [ ] Stripe keys added to `.env`
- [ ] Development server restarted
- [ ] Can add products to cart
- [ ] Checkout page loads
- [ ] Redirects to Stripe Checkout
- [ ] Test payment succeeds
- [ ] Redirects to success page
- [ ] Cart is cleared after payment
- [ ] Webhook receives events (if set up)

---

## Features Included

### ✅ Secure Payment Processing
- PCI DSS compliant (Stripe handles card data)
- No card details stored on your server
- Encrypted transactions

### ✅ Stripe Checkout
- Pre-built, mobile-optimized checkout page
- Supports multiple payment methods
- Automatic tax calculation
- Worldwide shipping address collection

### ✅ Test Mode
- Safe testing environment
- No real money charged
- Test card numbers provided
- Easy to switch to live mode later

### ✅ Order Management
- Session IDs for tracking
- Customer email collection
- Order metadata stored
- Webhook notifications

---

## API Endpoints Created

### POST /api/checkout
Creates a Stripe Checkout Session

**Request:**
```json
{
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 29.99,
      "quantity": 2,
      "image": "https://...",
      "selectedColor": "#000000"
    }
  ],
  "customerEmail": "customer@example.com"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

### POST /api/webhooks/stripe
Handles Stripe webhook events

**Events Handled:**
- `checkout.session.completed` - Payment successful
- `payment_intent.succeeded` - Payment confirmed
- `payment_intent.payment_failed` - Payment failed

---

## Testing Scenarios

### 1. Successful Purchase
1. Add products to cart
2. Go to checkout
3. Enter email
4. Use test card: `4242 4242 4242 4242`
5. Complete payment
6. Verify redirect to success page
7. Check cart is empty

### 2. Declined Payment
1. Add products to cart
2. Go to checkout
3. Use declined card: `4000 0000 0000 0002`
4. Payment should fail
5. Verify error message
6. Cart should still have items

### 3. 3D Secure Authentication
1. Add products to cart
2. Go to checkout
3. Use 3DS card: `4000 0025 0000 3155`
4. Complete authentication
5. Payment should succeed

---

## Going Live (Future)

### When Ready for Production:

1. **Complete Stripe Account Setup**
   - Add business details
   - Verify identity
   - Add bank account

2. **Switch to Live Mode**
   - Toggle "Test mode" OFF in Stripe Dashboard
   - Get live API keys (start with `pk_live_` and `sk_live_`)
   - Update `.env` with live keys

3. **Set Up Live Webhooks**
   - Add webhook endpoint in Stripe Dashboard
   - Use your production URL
   - Update webhook secret

4. **Test Thoroughly**
   - Use real card (small amount)
   - Verify full flow
   - Check webhook delivery

---

## Troubleshooting

### "Stripe failed to load"
- Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env`
- Restart development server
- Clear browser cache

### "Failed to create checkout session"
- Check `STRIPE_SECRET_KEY` in `.env`
- Verify key starts with `sk_test_`
- Check server logs for errors

### Webhook not receiving events
- Verify Stripe CLI is running
- Check webhook secret matches
- Look for errors in terminal

### Payment succeeds but cart not cleared
- Check success page URL
- Verify session ID in URL
- Check browser console for errors

---

## Security Best Practices

### ✅ DO:
- Keep secret keys in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables
- Test in test mode first
- Validate on server side

### ❌ DON'T:
- Commit API keys to Git
- Share secret keys
- Use live keys in development
- Store card details
- Skip webhook verification

---

## Support Resources

### Stripe Documentation
- Dashboard: https://dashboard.stripe.com
- Docs: https://stripe.com/docs
- API Reference: https://stripe.com/docs/api
- Test Cards: https://stripe.com/docs/testing

### Stripe Support
- Email: support@stripe.com
- Chat: Available in dashboard
- Community: https://stripe.com/community

---

## Summary

You now have a fully functional Stripe payment integration:
- ✅ Secure checkout with Stripe
- ✅ Test mode for safe testing
- ✅ Multiple test card scenarios
- ✅ Webhook support
- ✅ Success/cancel handling
- ✅ Cart management

Start testing with the test card numbers and you're ready to accept payments! 💳
