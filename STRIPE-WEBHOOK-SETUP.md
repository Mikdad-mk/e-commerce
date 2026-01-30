# Stripe Webhook Secret Setup Guide

## What is a Webhook Secret?

The webhook secret is used to verify that webhook events are actually coming from Stripe and not from a malicious source. It's essential for security.

---

## For Local Development (Testing)

### Quick Steps:

1. **Install Stripe CLI**
   ```bash
   # Windows (PowerShell with Scoop)
   scoop install stripe
   
   # Mac
   brew install stripe/stripe-cli/stripe
   
   # Or download from:
   # https://github.com/stripe/stripe-cli/releases/latest
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```
   This opens your browser to authenticate.

3. **Start Webhook Forwarding**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the Secret**
   You'll see output like:
   ```
   > Ready! Your webhook signing secret is whsec_abc123...
   ```

5. **Add to .env**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_abc123...
   ```

6. **Restart Your Dev Server**
   ```bash
   npm run dev
   ```

7. **Keep Stripe CLI Running**
   Leave the `stripe listen` command running in a separate terminal.

---

## For Production Deployment

### Step-by-Step:

1. **Go to Stripe Dashboard**
   - Visit: https://dashboard.stripe.com
   - Switch to **Live mode** (toggle in top right)

2. **Navigate to Webhooks**
   - Click **Developers** → **Webhooks**
   - Click **Add endpoint**

3. **Configure Endpoint**
   
   **Endpoint URL:**
   ```
   https://yourdomain.com/api/webhooks/stripe
   ```
   
   **Description:** (optional)
   ```
   Production webhook for order processing
   ```
   
   **Events to send:**
   - Select these events:
     - ✅ `checkout.session.completed`
     - ✅ `payment_intent.succeeded`
     - ✅ `payment_intent.payment_failed`
   
   Or click **"Select all events"** for comprehensive coverage

4. **Get Signing Secret**
   - After creating, click on the endpoint
   - Find **"Signing secret"**
   - Click **"Reveal"**
   - Copy the secret (starts with `whsec_`)

5. **Add to Production Environment**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_production_secret
   ```

6. **Deploy Your Application**
   Make sure the environment variable is set in your hosting platform.

---

## Testing Webhooks

### Test with Stripe CLI

While `stripe listen` is running, trigger test events:

```bash
# Test successful checkout
stripe trigger checkout.session.completed

# Test successful payment
stripe trigger payment_intent.succeeded

# Test failed payment
stripe trigger payment_intent.payment_failed
```

### Test with Real Payment

1. Add products to cart
2. Go to checkout
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Check your terminal running `stripe listen`
6. You should see the webhook event

---

## Verifying Webhooks Work

### Check Logs

**In your terminal:**
```
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

You'll see events like:
```
2024-01-26 10:30:45   --> checkout.session.completed [evt_abc123]
2024-01-26 10:30:45  <--  [200] POST http://localhost:3000/api/webhooks/stripe
```

**In Stripe Dashboard:**
1. Go to **Developers** → **Webhooks**
2. Click on your endpoint
3. View **Recent deliveries**
4. Check response codes (200 = success)

---

## Common Issues

### Issue: "No webhook secret provided"

**Solution:**
- Make sure `STRIPE_WEBHOOK_SECRET` is in your `.env` file
- Restart your development server
- Check for typos in the variable name

### Issue: "Webhook signature verification failed"

**Solution:**
- Make sure you're using the correct secret
- For local dev, use the secret from `stripe listen`
- For production, use the secret from Stripe Dashboard
- Don't mix test and live mode secrets

### Issue: "stripe: command not found"

**Solution:**
- Install Stripe CLI (see installation steps above)
- Restart your terminal after installation
- Check PATH environment variable

### Issue: Webhooks not receiving events

**Solution:**
- Make sure `stripe listen` is running
- Check the forwarding URL is correct
- Verify your API route exists at `/api/webhooks/stripe`
- Check firewall settings

---

## Security Best Practices

### ✅ DO:
- Always verify webhook signatures
- Use different secrets for test and live mode
- Keep secrets in environment variables
- Never commit secrets to Git
- Rotate secrets periodically

### ❌ DON'T:
- Don't hardcode webhook secrets
- Don't share secrets publicly
- Don't use the same secret across environments
- Don't skip signature verification
- Don't log webhook secrets

---

## Environment Variables Summary

Your `.env` file should have:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Webhook Secret (from stripe listen or Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Webhook Event Handling

Your webhook handler at `/api/webhooks/stripe` processes these events:

```typescript
switch (event.type) {
  case 'checkout.session.completed':
    // Payment successful
    // - Save order to database
    // - Send confirmation email
    // - Update inventory
    break;

  case 'payment_intent.succeeded':
    // Payment confirmed
    break;

  case 'payment_intent.payment_failed':
    // Payment failed
    // - Notify customer
    // - Log for review
    break;
}
```

---

## Quick Reference

### Local Development
```bash
# 1. Install CLI
scoop install stripe  # or brew install stripe/stripe-cli/stripe

# 2. Login
stripe login

# 3. Start forwarding
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 4. Copy secret to .env
STRIPE_WEBHOOK_SECRET=whsec_...

# 5. Test
stripe trigger checkout.session.completed
```

### Production
```
1. Dashboard → Developers → Webhooks
2. Add endpoint: https://yourdomain.com/api/webhooks/stripe
3. Select events
4. Copy signing secret
5. Add to production environment variables
```

---

## Need Help?

- **Stripe CLI Docs:** https://stripe.com/docs/stripe-cli
- **Webhook Docs:** https://stripe.com/docs/webhooks
- **Testing Webhooks:** https://stripe.com/docs/webhooks/test

---

## Summary

For **local testing**, use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

For **production**, create webhook endpoint in Stripe Dashboard and use that secret.

The webhook secret ensures your application only processes legitimate Stripe events! 🔒
