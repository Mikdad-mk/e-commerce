// Test PayPal Credentials
// Run with: node test-paypal-credentials.js

require('dotenv').config();

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

console.log('=== PayPal Credentials Test ===\n');

// Check if credentials are set
if (!clientId || clientId === 'your_paypal_client_id_here') {
  console.error('❌ Client ID is not set in .env file');
  process.exit(1);
}

if (!clientSecret || clientSecret === 'your_paypal_client_secret_here') {
  console.error('❌ Client Secret is not set in .env file');
  process.exit(1);
}

console.log('✅ Client ID found:', clientId.substring(0, 15) + '...');
console.log('✅ Client Secret found:', clientSecret.substring(0, 15) + '...');
console.log('\nTesting PayPal API authentication...\n');

// Test authentication
const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${auth}`,
  },
  body: 'grant_type=client_credentials',
})
  .then(response => response.json())
  .then(data => {
    if (data.access_token) {
      console.log('✅ SUCCESS! PayPal credentials are valid!');
      console.log('✅ Access token obtained');
      console.log('\n🎉 Your PayPal integration is working!\n');
    } else {
      console.error('❌ FAILED! PayPal authentication error:');
      console.error(JSON.stringify(data, null, 2));
      console.log('\n📝 What to do:');
      console.log('1. Go to: https://developer.paypal.com/dashboard/applications/sandbox');
      console.log('2. Click on your app');
      console.log('3. Make sure Client ID matches:', clientId.substring(0, 15) + '...');
      console.log('4. Click "Show" next to Secret and copy it');
      console.log('5. Update PAYPAL_CLIENT_SECRET in .env file');
      console.log('6. Make sure Client ID and Secret are from the SAME app\n');
    }
  })
  .catch(error => {
    console.error('❌ Error testing credentials:', error.message);
  });
