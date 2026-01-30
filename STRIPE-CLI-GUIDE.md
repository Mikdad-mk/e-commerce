# Stripe CLI - Complete Setup Guide

## What is Stripe CLI?

The Stripe CLI is a command-line tool that lets you:
- Test webhooks locally
- Trigger test events
- Monitor API requests
- Manage your Stripe account

---

## Step 1: Install Stripe CLI

### Windows (PowerShell)

**Option A: Using Scoop (Recommended)**
```powershell
# Install Scoop if you don't have it
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Add Stripe bucket
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git

# Install Stripe CLI
scoop install stripe
```

**Option B: Direct Download**
1. Go to: https://github.com/stripe/stripe-cli/releases/latest
2. Download `stripe_X.X.X_windows_x86_64.zip`
3. Extract to a folder (e.g., `C:\stripe`)
4. Add to PATH:
   - Search "Environment Variables" in Windows
   - Edit "Path" variable
   - Add the folder path
   - Restart terminal

### Mac

```bash
brew install stripe/stripe-cli/stripe
```

### Linux

```bash
# Debian/Ubuntu
wget https://github.com/stripe/stripe-cli/releases/latest/download/stripe_linux_x86_64.tar.gz
tar -xvf stripe_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/

# Or use package manager
# See: https://stripe.com/docs/stripe-cli#install
```

### Verify Installation

```bash
stripe --version
```

You should see something like:
```
stripe version 1.19.0
```

---

## Step 2: Login to Stripe

### Login Command

```bash
stripe login
```

### What Happens:

1. **Browser Opens**: A browser window will open automatically
2. **Authorize**: Click "Allow access" to authorize the CLI
3. **Success Message**: You'll see "Success! You're now authenticated"
4. **Return to Terminal**: Go back to your terminal

### Confirmation

You should see:
```
Your pairing code is: word-word-word
This pairing code verifies your authentication with Stripe.
Press Enter to open the browser (^C to quit)

> Done! The Stripe CLI is configured for [your-account] with account id acct_xxxxx
```

---

## Step 3: Test Webhook Events

### Trigger Test Events

Now you can trigger test events to see how your application handles them:

#### Payment Success
```bash
stripe trigger payment_intent.succeeded
```

#### Checkout Completed
```bash
stripe trigger checkout.session.completed
```

#### Payment Failed
```bash
stripe trigger payment_intent.payment_failed
```

#### Customer Created
```bash
stripe trigger customer.created
```

### What You'll See

```
Setting up fixture for: payment_intent
Running fixture for: payment_intent
Trigger succeeded! Check dashboard for event details.
```

---

## Step 4: Listen to Webhooks (For Local Development)

### Start Webhook Forwarding

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### What You'll See

```
> Ready! Your webhook signing secret is whsec_1234567890abcdefghijklmnopqrstuvwxyz (^C to quit)
```

### Copy the Webhook Secret

1. Copy the `whsec_...` value
2. Add to your `.env` file:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefghijklmnopqrstuvwxyz
   ```
3. Restart your dev server

### Keep It Running

**Important:** Keep this terminal window open while testing. It forwards webhook events from Stripe to your local server.

---

## Step 5: Test Your Integration

### Terminal Setup

You'll need **3 terminal windows**:

**Terminal 1: Dev Server**
```bash
cd e-commerce
npm run dev
```

**Terminal 2: Stripe Webhook Listener**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Terminal 3: Trigger Events**
```bash
stripe trigger checkout.session.completed
```

### Watch the Events

In Terminal 2 (webhook listener), you'll see:
```
2024-01-26 10:30:45   --> checkout.session.completed [evt_abc123]
2024-01-26 10:30:45  <--  [200] POST http://localhost:3000/api/webhooks/stripe [evt_abc123]
```

- `-->` = Event sent to your app
- `<--` = Response from your app
- `[200]` = Success (HTTP 200)

---

## Common Commands

### View Account Info
```bash
stripe config --list
```

### View Recent Events
```bash
stripe events list
```

### View Specific Event
```bash
stripe events retrieve evt_xxxxx
```

### View Customers
```bash
stripe customers list
```

### View Payments
```bash
stripe payment_intents list
```

### Logout
```bash
stripe logout
```

### Get Help
```bash
stripe --help
stripe trigger --help
```

---

## Testing Your E-Commerce Flow

### Complete Test Scenario

1. **Start Everything:**
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

2. **Make a Test Purchase:**
   - Go to http://localhost:3000/shop
   - Add products to cart
   - Go to checkout
   - Use test card: `4242 4242 4242 4242`
   - Complete payment

3. **Watch the Webhook:**
   In Terminal 2, you'll see:
   ```
   --> checkout.session.completed
   <-- [200] POST http://localhost:3000/api/webhooks/stripe
   ```

4. **Verify in Dashboard:**
   - Go to https://dashboard.stripe.com
   - Check **Payments** → See your test payment
   - Check **Developers** → **Events** → See the webhook event

---

## Trigger All Available Events

### Payment Events
```bash
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
stripe trigger payment_intent.created
stripe trigger payment_intent.canceled
```

### Checkout Events
```bash
stripe trigger checkout.session.completed
stripe trigger checkout.session.expired
```

### Customer Events
```bash
stripe trigger customer.created
stripe trigger customer.updated
stripe trigger customer.deleted
```

### Charge Events
```bash
stripe trigger charge.succeeded
stripe trigger charge.failed
stripe trigger charge.refunded
```

### Refund Events
```bash
stripe trigger refund.created
stripe trigger refund.updated
```

---

## Monitoring API Requests

### Watch All API Requests

```bash
stripe listen --print-json
```

This shows all API requests in real-time with full JSON payloads.

### Filter by Event Type

```bash
stripe listen --events checkout.session.completed,payment_intent.succeeded
```

---

## Troubleshooting

### "stripe: command not found"

**Solution:**
- Restart your terminal after installation
- Check if Stripe is in PATH
- Try reinstalling

### "Failed to authenticate"

**Solution:**
```bash
stripe logout
stripe login
```

### "Connection refused"

**Solution:**
- Make sure your dev server is running
- Check the port number (should be 3000)
- Verify the webhook URL

### Webhook returns 404

**Solution:**
- Check your API route exists at `/api/webhooks/stripe`
- Verify the file: `app/api/webhooks/stripe/route.ts`
- Restart dev server

### Webhook returns 500

**Solution:**
- Check server logs for errors
- Verify `STRIPE_WEBHOOK_SECRET` is set
- Check webhook handler code

---

## Best Practices

### Development Workflow

1. **Always run webhook listener during development:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

2. **Test with CLI before real payments:**
   ```bash
   stripe trigger checkout.session.completed
   ```

3. **Monitor events in real-time:**
   - Keep webhook listener terminal visible
   - Watch for errors (non-200 responses)

4. **Check Stripe Dashboard:**
   - Verify events are logged
   - Check webhook delivery status

### Testing Checklist

- [ ] Stripe CLI installed and authenticated
- [ ] Webhook listener running
- [ ] Dev server running
- [ ] Webhook secret in `.env`
- [ ] Can trigger test events
- [ ] Webhooks return 200
- [ ] Events logged in dashboard

---

## Quick Reference Card

```bash
# Installation
scoop install stripe          # Windows
brew install stripe/stripe-cli/stripe  # Mac

# Authentication
stripe login                  # Login
stripe logout                 # Logout

# Webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe
stripe trigger checkout.session.completed

# Monitoring
stripe events list            # Recent events
stripe payments list          # Recent payments
stripe customers list         # Customers

# Help
stripe --help                 # General help
stripe trigger --help         # Trigger help
```

---

## Resources

- **Stripe CLI Docs:** https://stripe.com/docs/stripe-cli
- **Installation Guide:** https://stripe.com/docs/stripe-cli#install
- **Webhook Testing:** https://stripe.com/docs/webhooks/test
- **CLI Reference:** https://stripe.com/docs/cli

---

## Summary

**To get started:**

1. Install: `scoop install stripe` (Windows) or `brew install stripe/stripe-cli/stripe` (Mac)
2. Login: `stripe login`
3. Listen: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Copy webhook secret to `.env`
5. Test: `stripe trigger checkout.session.completed`

**Keep the webhook listener running while developing!** 🚀
