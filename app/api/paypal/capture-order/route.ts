import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || clientId === 'your_paypal_client_id_here') {
    throw new Error('PayPal Client ID is not configured');
  }

  if (!clientSecret || clientSecret === 'your_paypal_client_secret_here') {
    throw new Error('PayPal Client Secret is not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('PayPal auth error:', data);
    throw new Error(data.error_description || 'Failed to get PayPal access token');
  }

  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json();

    if (!orderID) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const order = await response.json();

    if (!response.ok) {
      console.error('PayPal capture error:', order);
      return NextResponse.json(
        { error: order.message || 'Failed to capture payment' },
        { status: response.status }
      );
    }

    console.log('PayPal order captured:', order);

    // TODO: Save order to database
    // TODO: Send confirmation email
    // TODO: Update inventory

    return NextResponse.json({ order });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to capture order' },
      { status: 500 }
    );
  }
}
