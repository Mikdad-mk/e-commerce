# Stripe CLI - Quick Start

## 🚀 Get Started in 3 Minutes

### Step 1: Install (Choose your OS)

**Windows:**
```powershell
scoop install stripe
```

**Mac:**
```bash
brew install stripe/stripe-cli/stripe
```

**Linux:**
```bash
wget https://github.com/stripe/stripe-cli/releases/latest/download/stripe_linux_x86_64.tar.gz
tar -xvf stripe_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/
```

---

### Step 2: Login

```bash
stripe login
```

Press Enter, authorize in browser, done! ✅

---

### Step 3: Get Webhook Secret

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Copy the secret** (starts with `whsec_`) and add to `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

---

### Step 4: Test It

**In a new terminal:**

```bash
stripe trigger checkout.session.completed
```

You should see the event in your webhook listener! 🎉

---

## 📋 Daily Workflow

### Terminal Setup (3 windows)

**Terminal 1: Dev Server**
```bash
npm run dev
```

**Terminal 2: Webhook Listener**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Terminal 3: Testing**
```bash
stripe trigger checkout.session.completed
```

---

## 🧪 Test Commands

```bash
# Successful payment
stripe trigger payment_intent.succeeded

# Completed checkout
stripe trigger checkout.session.completed

# Failed payment
stripe trigger payment_intent.payment_failed

# Customer created
stripe trigger customer.created
```

---

## ✅ Verification Checklist

- [ ] `stripe --version` works
- [ ] `stripe login` successful
- [ ] Webhook listener running
- [ ] Webhook secret in `.env`
- [ ] Dev server running
- [ ] Can trigger events
- [ ] See events in terminal

---

## 🆘 Quick Fixes

**Command not found?**
```bash
# Restart terminal after install
```

**Can't login?**
```bash
stripe logout
stripe login
```

**Webhook not working?**
```bash
# Check .env has STRIPE_WEBHOOK_SECRET
# Restart dev server
# Verify webhook listener is running
```

---

## 📚 Full Guides

- Complete setup: `STRIPE-CLI-GUIDE.md`
- Webhook details: `STRIPE-WEBHOOK-SETUP.md`
- Payment setup: `STRIPE-SETUP.md`

---

## 🎯 That's It!

You're ready to test Stripe payments locally! 🚀
