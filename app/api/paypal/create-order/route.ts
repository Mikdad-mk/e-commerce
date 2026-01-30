import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // Check if credentials are set
  if (!clientId || clientId === 'your_paypal_client_id_here') {
    throw new Error('PayPal Client ID is not configured. Please add NEXT_PUBLIC_PAYPAL_CLIENT_ID to your .env file');
  }

  if (!clientSecret || clientSecret === 'your_paypal_client_secret_here') {
    throw new Error('PayPal Client Secret is not configured. Please add PAYPAL_CLIENT_SECRET to your .env file');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  console.log('Requesting PayPal access token...');
  console.log('Using API:', PAYPAL_API);
  console.log('Client ID (first 10 chars):', clientId.substring(0, 10) + '...');

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

  console.log('PayPal access token obtained successfully');
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Calculate total
    const total = items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: total.toFixed(2),
                },
              },
            },
            items: items.map((item: any) => ({
              name: item.name,
              unit_amount: {
                currency_code: 'USD',
                value: item.price.toFixed(2),
              },
              quantity: item.quantity.toString(),
            })),
          },
        ],
        application_context: {
          return_url: `${request.headers.get('origin')}/checkout/success`,
          cancel_url: `${request.headers.get('origin')}/cart`,
          shipping_preference: 'GET_FROM_FILE',
          user_action: 'PAY_NOW',
          brand_name: 'Avenzo',
        },
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('PayPal order creation error:', order);
      return NextResponse.json(
        { error: order.message || 'Failed to create PayPal order' },
        { status: response.status }
      );
    }

    return NextResponse.json({ orderID: order.id });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 500 }
    );
  }
}
