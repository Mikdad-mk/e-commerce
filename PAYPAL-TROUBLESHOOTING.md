# PayPal "Token Signature Verification Failed" - Fix Guide

## 🚨 Error You're Seeing:

```
PayPal order creation error: {
  error: 'invalid_token',
  error_description: 'Token signature verification failed'
}
```

## ✅ This Means:

Your PayPal credentials are either:
1. Not set in `.env` file
2. Incorrect/invalid
3. From wrong mode (Live vs Sandbox)
4. Have extra spaces or quotes

---

## 🔧 Fix It Now:

### Step 1: Check Your .env File

Open `e-commerce/.env` and look for:

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
```

**If you see `your_paypal_client_id_here`** → You haven't added credentials yet!

---

### Step 2: Get CORRECT Credentials

**Go to:** https://developer.paypal.com/dashboard/applications/sandbox

**IMPORTANT:** Make sure you're in **SANDBOX** mode (toggle at top of page)

#### If You Don't Have an App Yet:

1. Click "Create App"
2. Name: `Avenzo Store`
3. Type: **Merchant**
4. Click "Create App"

#### If You Already Have an App:

1. Click on your app name
2. You'll see the credentials

---

### Step 3: Copy Credentials CAREFULLY

#### Client ID:
```
Client ID: AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
```

**How to copy:**
- Click the copy icon next to it
- OR select all text and copy (Ctrl+C)
- Make sure you got the ENTIRE string

#### Secret:
```
Secret: •••••••••••••••• [Show]
```

**How to copy:**
1. Click "Show" button
2. Copy the revealed secret
3. Make sure you got the ENTIRE string

---

### Step 4: Update .env File CORRECTLY

**Open:** `e-commerce/.env`

**Replace:**
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
```

**With YOUR actual values:**
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
PAYPAL_CLIENT_SECRET=EGnHDxD_qRPdaLdZz8iCr8N7_MzF-YHPTkjs6NKYQvQSBngp4PTTVWkPZRbL6PI7CUxJ9z03NnKJj0Gg
```

**CRITICAL RULES:**
- ❌ NO quotes: `"AZDxj..."` is WRONG
- ❌ NO spaces: ` AZDxj...` is WRONG
- ❌ NO line breaks in the middle
- ✅ Just paste the value directly after the `=`

---

### Step 5: Save and Restart

**Save the file:** Ctrl+S (Windows) or Cmd+S (Mac)

**Stop server:** Press Ctrl+C in terminal

**Start server:**
```bash
npm run dev
```

**Wait for:**
```
✓ Ready in 2.3s
```

---

### Step 6: Test Again

1. Go to http://localhost:3000/checkout
2. Enter email
3. Click PayPal button
4. **Should work now!** ✅

---

## 🔍 Still Getting Error?

### Check 1: Verify Credentials Are Set

**In terminal, run:**
```bash
# Windows (PowerShell)
Get-Content .env | Select-String PAYPAL

# Mac/Linux
cat .env | grep PAYPAL
```

**Should show:**
```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxj... (your actual ID)
PAYPAL_CLIENT_SECRET=EGnHD... (your actual secret)
```

**If you see `your_paypal_client_id_here`** → Credentials not set!

---

### Check 2: Verify Mode (Sandbox vs Live)

**Your credentials MUST match the mode:**

- Using **Sandbox** credentials? → App uses Sandbox API ✅
- Using **Live** credentials? → Will fail in development ❌

**To check:**
1. Go to https://developer.paypal.com/dashboard
2. Look at toggle at top
3. Should say **"Sandbox"**
4. Your app credentials should be from Sandbox mode

---

### Check 3: Regenerate Credentials

**If credentials are definitely wrong:**

1. Go to https://developer.paypal.com/dashboard/applications/sandbox
2. Click on your app
3. Scroll down to "Secret"
4. Click "Show"
5. Click "Generate New Secret" (if available)
6. Copy the NEW secret
7. Update .env file
8. Restart server

---

### Check 4: Create New App

**If nothing works, start fresh:**

1. Go to https://developer.paypal.com/dashboard/applications/sandbox
2. Click "Create App"
3. Name: `Avenzo Store 2`
4. Type: Merchant
5. Create
6. Copy NEW credentials
7. Update .env
8. Restart server

---

## 📋 Common Mistakes:

### ❌ Wrong:
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID="AZDxj..."  # Has quotes
NEXT_PUBLIC_PAYPAL_CLIENT_ID= AZDxj...   # Has space after =
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxj
...                                       # Line break in middle
```

### ✅ Correct:
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
```

---

## 🎯 Verification Checklist:

- [ ] Went to PayPal Developer Dashboard
- [ ] Confirmed I'm in **Sandbox** mode
- [ ] Created or opened app
- [ ] Copied Client ID (entire string)
- [ ] Clicked "Show" and copied Secret (entire string)
- [ ] Opened `.env` file
- [ ] Pasted Client ID (no quotes, no spaces)
- [ ] Pasted Secret (no quotes, no spaces)
- [ ] Saved `.env` file
- [ ] Stopped server (Ctrl+C)
- [ ] Started server (`npm run dev`)
- [ ] Tested checkout
- [ ] **PayPal button works!** ✅

---

## 🆘 Emergency: Use Test Credentials

**If you can't get your own credentials working, try these test ones:**

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R
PAYPAL_CLIENT_SECRET=EGnHDxD_qRPdaLdZz8iCr8N7_MzF-YHPTkjs6NKYQvQSBngp4PTTVWkPZRbL6PI7CUxJ9z03NnKJj0Gg
```

**Note:** These are example credentials and may not work. You MUST use your own.

---

## 📞 Need More Help?

### Check Server Logs:

After restarting server, look for:
```
Requesting PayPal access token...
Using API: https://api-m.sandbox.paypal.com
Client ID (first 10 chars): AZDxjDScFp...
PayPal access token obtained successfully
```

**If you see:**
```
PayPal Client ID is not configured
```
→ Credentials not in .env file

**If you see:**
```
Token signature verification failed
```
→ Credentials are wrong

---

## ✅ Success Looks Like:

**Server logs:**
```
Requesting PayPal access token...
Using API: https://api-m.sandbox.paypal.com
Client ID (first 10 chars): AZDxjDScFp...
PayPal access token obtained successfully
POST /api/paypal/create-order 200 in 1234ms
```

**Browser:**
- PayPal button appears
- Clicking opens PayPal window
- Can complete payment
- Redirects to success page

---

**Remember:** You MUST use YOUR OWN credentials from YOUR PayPal Developer account!
