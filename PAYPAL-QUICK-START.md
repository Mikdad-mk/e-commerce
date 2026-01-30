# PayPal Quick Start - Get Connected in 5 Minutes

## 🚀 Step-by-Step Setup

### Step 1: Create PayPal Developer Account (2 minutes)

1. **Go to:** https://developer.paypal.com
2. **Click:** "Log in to Dashboard" (top right)
3. **Sign in** with your PayPal account
   - Don't have one? Click "Sign Up" and create a personal PayPal account first
4. **Accept** the developer agreement

---

### Step 2: Create Sandbox App (2 minutes)

1. **Go to:** https://developer.paypal.com/dashboard/applications/sandbox
2. **Click:** "Create App" button
3. **Fill in:**
   - App Name: `Avenzo Store`
   - App Type: Select **Merchant**
4. **Click:** "Create App"

---

### Step 3: Get Your Credentials (1 minute)

You'll see your app details page with:

**Client ID:**
```
AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
```
(This is an example - yours will be different)

**Secret:**
1. Click "Show" next to Secret
2. Copy the secret value

---

### Step 4: Add to Your .env File

Open `e-commerce/.env` and update:

```env
# PayPal Configuration (Sandbox for testing)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=paste_your_client_id_here
PAYPAL_CLIENT_SECRET=paste_your_secret_here
```

**Example:**
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
PAYPAL_CLIENT_SECRET=EGnHDxD_qRPdaLdZz8iCr8N7_MzF-YHPTkjs6NKYQvQSBngp4PTTVWkPZRbL6PI7CUxJ9z03NnKJj0Gg
```

---

### Step 5: Restart Your Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

### Step 6: Test Payment (1 minute)

1. **Go to:** http://localhost:3000/shop
2. **Add** products to cart
3. **Go to** checkout
4. **Enter** your email
5. **Click** PayPal button
6. **Login** with sandbox account (see below)
7. **Complete** payment ✅

---

## 🧪 Test Accounts

### Get Sandbox Test Account

1. **Go to:** https://developer.paypal.com/dashboard/accounts
2. **Find** "Personal" account
3. **Click** "..." → "View/Edit Account"
4. **Copy** email and password

**Or use these test cards directly:**
- **Visa:** 4032039974960680
- **Mastercard:** 5425233430109903
- **Expiry:** Any future date
- **CVV:** Any 3 digits

---

## ✅ Verification Checklist

- [ ] PayPal developer account created
- [ ] Sandbox app created
- [ ] Client ID copied to .env
- [ ] Secret copied to .env
- [ ] Server restarted
- [ ] Can see PayPal button on checkout
- [ ] Test payment successful

---

## 🎯 Quick Links

- **Dashboard:** https://developer.paypal.com/dashboard
- **Sandbox Accounts:** https://developer.paypal.com/dashboard/accounts
- **App Settings:** https://developer.paypal.com/dashboard/applications/sandbox
- **Test Cards:** https://developer.paypal.com/tools/sandbox/card-testing/

---

## 🆘 Troubleshooting

### PayPal button not showing?
```bash
# Check .env has NEXT_PUBLIC_PAYPAL_CLIENT_ID
# Restart server
npm run dev
```

### Can't create app?
- Make sure you're in **Sandbox** mode (toggle at top)
- Try refreshing the page
- Clear browser cache

### Payment not working?
- Check both Client ID and Secret are set
- Verify you're using sandbox test account
- Check browser console for errors

---

## 📚 Full Documentation

See `PAYPAL-SETUP.md` for complete details including:
- Going live with production
- Webhook setup
- Advanced features
- Security best practices

---

## 🎉 That's It!

You're now connected to PayPal and ready to accept payments! 🚀

**Next Steps:**
1. Test with different payment methods
2. Try cancelling a payment
3. Check PayPal dashboard for transactions
4. When ready, switch to live mode for real payments
