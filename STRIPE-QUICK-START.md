# Stripe Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Create Stripe Account
- Go to https://stripe.com and sign up
- Verify your email

### 2. Get Your Test Keys
1. Login to https://dashboard.stripe.com
2. Make sure "Test mode" is ON (top right)
3. Go to **Developers** → **API keys**
4. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### 3. Add Keys to .env
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### 4. Restart Server
```bash
npm run dev
```

### 5. Test Payment
1. Add products to cart
2. Go to checkout
3. Enter email
4. Click "Proceed to Payment"
5. Use test card: **4242 4242 4242 4242**
6. Expiry: **12/34**, CVC: **123**, ZIP: **12345**
7. Complete payment ✅

---

## 💳 Test Card Numbers

### Success
```
4242 4242 4242 4242
```

### Declined
```
4000 0000 0000 0002
```

### Requires 3D Secure
```
4000 0025 0000 3155
```

**For all cards:**
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

---

## ✅ What's Included

- Secure Stripe Checkout
- Test mode (no real money)
- Cart integration
- Success page
- Webhook support
- Worldwide shipping

---

## 📚 Full Documentation

See `STRIPE-SETUP.md` for complete setup guide including:
- Webhook configuration
- Going live checklist
- Troubleshooting
- Security best practices

---

## 🆘 Quick Troubleshooting

**Stripe not loading?**
- Check keys in `.env`
- Restart server

**Payment not working?**
- Use test card numbers above
- Check Stripe Dashboard logs

**Cart not clearing?**
- Check success page URL
- Verify session ID present

---

## 🎉 You're Ready!

Your e-commerce platform now accepts payments through Stripe!

Test it out and start selling! 🛍️
