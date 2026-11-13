const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

const jsonHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || '');
  } catch {
    return fallback;
  }
}

function randomHex(bytes) {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  return [...data].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function generateOrderId() {
  const date = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 8);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BRN-${date}-${rand}`;
}

function generateQuiverOrderId() {
  const date = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 8);
  return `QVR-${date}-${Math.floor(1000 + Math.random() * 9000)}`;
}

const quiverMenu = {
  'm-01': ['Quiver Sovereign Nyama Choma Platter', 6500], 'm-02': ['Dry-Aged Tomahawk Steak (1.2kg)', 8800],
  'm-03': ['Dom Pérignon Brut Vintage Champagne', 48000], 'm-04': ['Hennessy X.O Cognac (700ml)', 36000],
  'm-05': ['Nairobi Glow Signature Cocktail', 1400], 'm-06': ['Exotic Coconut Mint Ice Shisha', 2500]
};
const quiverEvents = {
  'evt-01': { 'Regular Early Bird': 2000, 'VIP Lounge Pass': 5000, 'VVIP Table (6 Guests)': 45000 },
  'evt-02': { 'Regular Pass': 1500, 'Gangster VIP Deck': 4000, 'Boss Table (8 Guests)': 60000 },
  'evt-03': { 'Full Day Pass': 2500, 'VIP Sunset Cabana (4 Guests)': 25000 },
  'evt-04': { 'Brunch Ticket': 3500, 'Noir VIP Lounge (6 Guests)': 35000 }
};
const quiverMemberships = { silver: 15000, gold: 45000, platinum: 120000, black: 300000 };
const quiverSections = { 'VVIP Sovereign Glass Booth': 25000, 'Rooftop Terrace High-Tables': 15000, 'Quiver Steakhouse Garden Pergola': 20000, 'Standard Dancefloor Table': 10000 };
const quiverBottlePackages = { 'None (Drinks ordered at venue)': 0, 'Moët & Chandon Brut + Hennessy VSOP': 35000, 'Dom Pérignon Vintage + Single Malt Vault Selection': 65000, 'Quiver Sovereign Meat Platter + Jameson Black Barrel': 20000 };

function calculateQuiverCheckout(checkout = {}) {
  const type = String(checkout.type || '');
  if (type === 'cart_preorder') {
    if (!Array.isArray(checkout.items) || checkout.items.length === 0) throw new Error('At least one menu item is required');
    const items = checkout.items.map(({ id, quantity = 1 }) => {
      const product = quiverMenu[id]; const qty = Number(quantity);
      if (!product || !Number.isInteger(qty) || qty < 1 || qty > 20) throw new Error('Invalid menu item or quantity');
      return { id, title: product[0], quantity: qty, price: product[1] };
    });
    return { title: 'Food & Bottle Service Pre-Order', items, total: items.reduce((sum, item) => sum + item.price * item.quantity, 0) };
  }
  if (type === 'event_ticket') {
    const price = quiverEvents[checkout.eventId]?.[checkout.tierName];
    if (!price) throw new Error('Invalid event ticket selection');
    return { title: `${checkout.eventTitle} - ${checkout.tierName}`, items: [{ title: checkout.tierName, quantity: 1, price }], total: price };
  }
  if (type === 'vip_membership') {
    const price = quiverMemberships[checkout.membershipId];
    if (!price) throw new Error('Invalid membership selection');
    return { title: `Quiver ${checkout.membershipId} membership`, items: [{ title: 'Annual membership', quantity: 1, price }], total: price };
  }
  if (type === 'reservation') {
    const sectionPrice = quiverSections[checkout.section]; const bottlePrice = quiverBottlePackages[checkout.bottleAddon];
    if (sectionPrice === undefined || bottlePrice === undefined) throw new Error('Invalid reservation selection');
    return { title: checkout.occasion || 'Quiver reservation', items: [{ title: checkout.section, quantity: 1, price: sectionPrice }, { title: checkout.bottleAddon, quantity: 1, price: bottlePrice }], total: sectionPrice + bottlePrice };
  }
  throw new Error('Unsupported Quiver checkout type');
}

async function hashPassword(password) {
  const input = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', input);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function getSettings(env) {
  const { results } = await env.DB.prepare('SELECT key, value FROM settings').all();
  return Object.fromEntries((results || []).map((row) => [row.key, row.value]));
}

const adminSessionLifetimeMs = 8 * 60 * 60 * 1000;
const adminSettingKeys = new Set([
  'MPESA_SHORTCODE',
  'MPESA_TILL_NUMBER',
  'MPESA_CALLBACK_URL',
  'MPESA_ENV',
  'PAYPAL_CLIENT_ID',
  'PAYPAL_ENV',
  'PAYSTACK_PUBLIC_KEY',
  'KOPOKOPO_CLIENT_ID',
  'KOPOKOPO_ENV',
  'KOPOKOPO_SERVICE_CO_REF'
]);
const secretSettingKeys = new Set([
  'MPESA_CONSUMER_KEY',
  'MPESA_CONSUMER_SECRET',
  'MPESA_PASSKEY',
  'PAYPAL_CLIENT_SECRET',
  'PAYSTACK_SECRET_KEY',
  'KOPOKOPO_CLIENT_SECRET',
  'KOPOKOPO_API_KEY'
]);

function getBearerToken(request) {
  const authorization = request.headers.get('authorization') || '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : '';
}

async function requireAdmin(request, env) {
  const token = getBearerToken(request);
  if (!token) return null;

  const tokenHash = await hashPassword(token);
  const session = await env.DB.prepare(
    'SELECT username FROM admin_sessions WHERE token_hash = ? AND expires_at > ?'
  ).bind(tokenHash, new Date().toISOString()).first();
  return session || null;
}

async function getMpesaConfig(env) {
  const settings = await getSettings(env);
  return {
    ...settings,
    MPESA_CONSUMER_KEY: env.MPESA_CONSUMER_KEY || '',
    MPESA_CONSUMER_SECRET: env.MPESA_CONSUMER_SECRET || '',
    MPESA_PASSKEY: env.MPESA_PASSKEY || ''
  };
}

function publicSettings(settings, env) {
  const result = {};
  for (const key of adminSettingKeys) result[key] = settings[key] || '';
  for (const key of secretSettingKeys) result[key] = env[key] ? 'configured' : 'not_configured';
  return result;
}

async function assignLicenseKeys(env, orderId) {
  const { results: items = [] } = await env.DB.prepare('SELECT * FROM order_items WHERE order_id = ?').bind(orderId).all();

  for (const item of items) {
    const product = await env.DB.prepare('SELECT license_keys FROM products WHERE id = ?').bind(item.product_id).first();
    let assignedKey = '';

    if (product) {
      const keys = parseJson(product.license_keys, []);
      if (keys.length > 0) {
        assignedKey = keys.shift();
        await env.DB.prepare('UPDATE products SET license_keys = ? WHERE id = ?')
          .bind(JSON.stringify(keys), item.product_id)
          .run();
      }
    }

    if (!assignedKey) {
      assignedKey = `BRN-GEN-${randomHex(4).toUpperCase()}`;
    }

    await env.DB.prepare('UPDATE order_items SET license_key = ? WHERE id = ?').bind(assignedKey, item.id).run();
  }
}

function formatKenyanPhone(phone = '') {
  let formatted = String(phone).replace(/\D/g, '');
  if (formatted.startsWith('0')) formatted = `254${formatted.slice(1)}`;
  if (!formatted.startsWith('254')) formatted = `254${formatted}`;
  return formatted;
}

function getMpesaBaseUrl(config) {
  return config.MPESA_ENV === 'live' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke';
}

async function getMpesaToken(config) {
  const auth = btoa(`${config.MPESA_CONSUMER_KEY}:${config.MPESA_CONSUMER_SECRET}`);
  const response = await fetch(`${getMpesaBaseUrl(config)}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` }
  });

  if (!response.ok) {
    throw new Error(`Daraja OAuth failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function initiateMpesaSTKPush(env, request, { orderId, amount, phone, onMockPaid }) {
  if (env.MPESA_MODE === 'n8n') {
    if (!env.N8N_STK_WEBHOOK) {
      throw new Error('N8N_STK_WEBHOOK is not configured for n8n relay mode.');
    }
    const formattedPhone = formatKenyanPhone(phone);
    const relayResponse = await fetch(env.N8N_STK_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: formattedPhone,
        amount: Math.round(amount),
        ref: orderId.slice(0, 12),
        desc: 'Brane Shop Purchase'
      })
    });
    if (!relayResponse.ok) {
      const errText = await relayResponse.text();
      throw new Error(`n8n STK relay failed: ${relayResponse.status} ${errText}`);
    }
    const relayData = await relayResponse.json();
    return {
      CheckoutRequestID: relayData.checkoutRequestId || '',
      CustomerMessage: relayData.customerMessage || 'STK Push sent. Enter your M-Pesa PIN.',
      ResponseCode: '0',
      ResponseDescription: 'STK Push forwarded to n8n relay.'
    };
  }

  const config = await getMpesaConfig(env);
  const formattedPhone = formatKenyanPhone(phone);
  const hasCredentials = config.MPESA_CONSUMER_KEY && config.MPESA_CONSUMER_SECRET && config.MPESA_SHORTCODE && config.MPESA_PASSKEY;

  if (!hasCredentials && config.MPESA_ENV === 'live') {
    throw new Error('Live M-Pesa is not configured. Set the required Worker secrets before accepting payments.');
  }

  if (!hasCredentials) {
    const receipt = `MOCK${randomHex(4).toUpperCase()}`;
    await onMockPaid(receipt);

    return {
      MerchantRequestID: `mock-req-${randomHex(4)}`,
      CheckoutRequestID: receipt,
      ResponseCode: '0',
      ResponseDescription: 'Mock payment approved. Configure M-Pesa settings for live STK Push.',
      CustomerMessage: 'Mock payment approved.',
      isMock: true
    };
  }

  if (!config.MPESA_TILL_NUMBER) {
    throw new Error('M-Pesa Buy Goods till number is not configured');
  }

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = btoa(`${config.MPESA_SHORTCODE}${config.MPESA_PASSKEY}${timestamp}`);
  const callbackUrl = config.MPESA_CALLBACK_URL || `${new URL(request.url).origin}/api/payments/mpesa/callback`;
  const token = await getMpesaToken(config);

  const response = await fetch(`${getMpesaBaseUrl(config)}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      BusinessShortCode: config.MPESA_SHORTCODE,
      PartyB: config.MPESA_TILL_NUMBER,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerBuyGoodsOnline',
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: orderId.slice(0, 12),
      TransactionDesc: 'Brane Shop Purchase'
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errorMessage || data.errorDescription || 'STK Push failed');
  }
  
  return data;
}

function normalizePaymentMethod(method = 'mpesa') {
  const normalized = String(method).trim().toLowerCase();
  if (['card', 'paystack', 'credit_card', 'debit_card'].includes(normalized)) return 'card';
  if (['mpesa', 'm-pesa', 'm_pesa'].includes(normalized)) return 'mpesa';
  return normalized;
}

async function initializeCardPayment(env, request, { orderId, amount, email }) {
  const config = await getSettings(env);
  const frontendBaseUrl = env.FRONTEND_BASE_URL || new URL(request.url).origin;
  const callbackUrl = `${frontendBaseUrl}/checkout/success?reference=${encodeURIComponent(orderId)}&gateway=card`;

  if (!config.PAYSTACK_SECRET_KEY) {
    return {
      status: true,
      message: 'Mock card checkout created. Configure Paystack settings for live card payments.',
      data: {
        authorization_url: `${callbackUrl}&mock=true`,
        access_code: `mock-card-${randomHex(4)}`,
        reference: orderId
      },
      isMock: true
    };
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      amount: Math.round(amount * 100),
      reference: orderId,
      callback_url: callbackUrl
    })
  });

  const data = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Card checkout initialization failed');
  }

  return data;
}

async function capturePaypalOrder(env, paypalOrderId) {
  if (paypalOrderId.startsWith('MOCK-PAYPAL-')) {
    return {
      status: 'COMPLETED',
      purchase_units: [{ payments: { captures: [{ id: `MOCK-CAP-${randomHex(3).toUpperCase()}` }] } }]
    };
  }

  const config = await getSettings(env);
  const baseUrl = config.PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
  const auth = btoa(`${config.PAYPAL_CLIENT_ID}:${config.PAYPAL_CLIENT_SECRET}`);
  const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!tokenRes.ok) throw new Error(`PayPal Auth failed: ${tokenRes.statusText}`);
  const { access_token: token } = await tokenRes.json();

  const response = await fetch(`${baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'PayPal Capture Order failed');
  return data;
}

async function verifyPaystackTransaction(env, reference) {
  const config = await getSettings(env);
  if (!config.PAYSTACK_SECRET_KEY || reference.length < 15) {
    return { data: { status: 'success' }, isMock: true };
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}` }
  });

  const data = await response.json();
  if (!response.ok || !data.status) throw new Error(data.message || 'Paystack verification failed');
  return data;
}

async function route(request, env) {
  if (!env.DB) return json({ error: 'D1 binding DB is not configured' }, 500);

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  const method = request.method;

  if (method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

  if ((path === '/' || path === '/api') && method === 'GET') {
    return json({ status: 'active', message: 'Brane Shop API Worker is running successfully.' });
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const { username, password } = await readJson(request);
    if (!username || !password) return json({ error: 'Username and password are required' }, 400);

    const hashed = await hashPassword(password);
    const row = await env.DB.prepare('SELECT * FROM admin_users WHERE username = ? AND password = ?').bind(username, hashed).first();
    if (!row) return json({ error: 'Invalid admin credentials' }, 401);

    const token = randomHex(32);
    const expiresAt = new Date(Date.now() + adminSessionLifetimeMs).toISOString();
    await env.DB.prepare('DELETE FROM admin_sessions WHERE expires_at <= ?').bind(new Date().toISOString()).run();
    await env.DB.prepare(
      'INSERT INTO admin_sessions (token_hash, username, expires_at) VALUES (?, ?, ?)'
    ).bind(await hashPassword(token), row.username, expiresAt).run();

    return json({ token, username: row.username, expiresAt });
  }

  if (path === '/api/auth/verify' && method === 'GET') {
    const admin = await requireAdmin(request, env);
    return admin ? json({ valid: true, username: admin.username }) : json({ valid: false }, 401);
  }

  if (path === '/api/products' && method === 'GET') {
    const { results = [] } = await env.DB.prepare('SELECT id, title, description, category, price, image_url, download_file, system_req FROM products').all();
    return json(results.map((product) => ({ ...product, system_req: parseJson(product.system_req, {}) })));
  }

  const productMatch = path.match(/^\/api\/products\/(\d+)$/);
  if (productMatch && method === 'GET') {
    const row = await env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(productMatch[1]).first();
    if (!row) return json({ error: 'Product not found' }, 404);
    return json({ ...row, system_req: parseJson(row.system_req, {}), license_keys: parseJson(row.license_keys, []) });
  }

  if (path === '/api/products' && method === 'POST') {
    if (!await requireAdmin(request, env)) return json({ error: 'Admin authorization is required' }, 401);
    const body = await readJson(request);
    const result = await env.DB.prepare(
      'INSERT INTO products (title, description, category, price, image_url, download_file, license_keys, system_req) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      body.title,
      body.description,
      body.category,
      body.price,
      body.image_url,
      body.download_file || 'mock_installer.exe',
      JSON.stringify(Array.isArray(body.license_keys) ? body.license_keys : []),
      JSON.stringify(typeof body.system_req === 'object' && body.system_req ? body.system_req : {})
    ).run();

    return json({ id: result.meta.last_row_id, title: body.title, description: body.description, category: body.category, price: body.price });
  }

  if (productMatch && method === 'PUT') {
    if (!await requireAdmin(request, env)) return json({ error: 'Admin authorization is required' }, 401);
    const current = await env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(productMatch[1]).first();
    if (!current) return json({ error: 'Product not found' }, 404);

    const body = await readJson(request);
    await env.DB.prepare(
      'UPDATE products SET title = ?, description = ?, category = ?, price = ?, image_url = ?, download_file = ?, license_keys = ?, system_req = ? WHERE id = ?'
    ).bind(
      body.title || current.title,
      body.description || current.description,
      body.category || current.category,
      body.price !== undefined ? body.price : current.price,
      body.image_url || current.image_url,
      body.download_file || current.download_file,
      Array.isArray(body.license_keys) ? JSON.stringify(body.license_keys) : current.license_keys,
      typeof body.system_req === 'object' && body.system_req ? JSON.stringify(body.system_req) : current.system_req,
      productMatch[1]
    ).run();

    return json({ message: 'Product updated successfully' });
  }

  if (productMatch && method === 'DELETE') {
    if (!await requireAdmin(request, env)) return json({ error: 'Admin authorization is required' }, 401);
    await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(productMatch[1]).run();
    return json({ message: 'Product deleted successfully' });
  }

  if (path === '/api/orders/checkout' && method === 'POST') {
    const { email, phone = '', paymentMethod = 'mpesa', cartItems = [] } = await readJson(request);
    const method = normalizePaymentMethod(paymentMethod);
    if (!email || !Array.isArray(cartItems) || cartItems.length === 0) {
      return json({ error: 'Email and cart items are required' }, 400);
    }
    if (!['mpesa', 'card'].includes(method)) {
      return json({ error: 'Unsupported payment method. Choose mpesa or card.' }, 400);
    }
    if (method === 'mpesa' && !phone) {
      return json({ error: 'Phone number is required for M-Pesa checkout' }, 400);
    }

    const orderId = generateOrderId();
    let totalAmount = 0;
    const itemsWithPrices = [];

    for (const item of cartItems) {
      const product = await env.DB.prepare('SELECT id, title, price FROM products WHERE id = ?').bind(item.id).first();
      if (!product) return json({ error: `Product with ID ${item.id} not found` }, 400);
      totalAmount += Number(product.price) * (item.qty || 1);
      itemsWithPrices.push({ product_id: product.id, title: product.title, price: product.price });
    }

    await env.DB.prepare(
      'INSERT INTO orders (order_id, email, phone, total, status, payment_method, payment_ref, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(orderId, email, phone, totalAmount, 'pending', method, '', new Date().toISOString()).run();

    for (const item of itemsWithPrices) {
      await env.DB.prepare('INSERT INTO order_items (order_id, product_id, product_title, price) VALUES (?, ?, ?, ?)')
        .bind(orderId, item.product_id, item.title, item.price)
        .run();
    }

    if (method === 'card') {
      const cardRes = await initializeCardPayment(env, request, { orderId, amount: totalAmount, email });
      await env.DB.prepare('UPDATE orders SET payment_ref = ? WHERE order_id = ?').bind(cardRes.data.reference || orderId, orderId).run();

      return json({
        orderId,
        paymentMethod: 'card',
        provider: 'paystack',
        status: 'pending',
        nextAction: 'redirect',
        authorizationUrl: cardRes.data.authorization_url,
        accessCode: cardRes.data.access_code,
        reference: cardRes.data.reference || orderId,
        message: cardRes.message || 'Card checkout initialized.',
        isMock: Boolean(cardRes.isMock)
      });
    }

    const mpesaRes = await initiateMpesaSTKPush(env, request, { orderId, amount: totalAmount, phone, onMockPaid: async (receipt) => {
      await env.DB.prepare("UPDATE orders SET status = 'paid', payment_ref = ? WHERE order_id = ?").bind(receipt, orderId).run();
      await assignLicenseKeys(env, orderId);
    } });
    const checkoutId = mpesaRes.CheckoutRequestID || '';
    await env.DB.prepare('UPDATE orders SET payment_ref = ? WHERE order_id = ?').bind(checkoutId, orderId).run();

    return json({
      orderId,
      paymentMethod: 'mpesa',
      status: mpesaRes.isMock ? 'paid' : 'pending',
      nextAction: 'stk_push',
      checkoutRequestId: checkoutId,
      message: mpesaRes.CustomerMessage || 'STK Push sent successfully.',
      isMock: Boolean(mpesaRes.isMock)
    });
  }

  if (path === '/api/quiver/orders/checkout' && method === 'POST') {
    const { email, phone = '', paymentMethod = 'mpesa', checkout } = await readJson(request);
    if (!email || !phone) return json({ error: 'Email and phone number are required' }, 400);
    if (normalizePaymentMethod(paymentMethod) !== 'mpesa') return json({ error: 'Only M-Pesa is available for Quiver checkout' }, 400);

    const verifiedCheckout = calculateQuiverCheckout(checkout);
    const orderId = generateQuiverOrderId();
    const details = { ...checkout, ...verifiedCheckout };
    await env.DB.prepare(
      'INSERT INTO quiver_orders (order_id, email, phone, total, status, payment_method, payment_ref, details_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(orderId, email, phone, verifiedCheckout.total, 'pending', 'mpesa', '', JSON.stringify(details), new Date().toISOString()).run();

    const mpesaRes = await initiateMpesaSTKPush(env, request, { orderId, amount: verifiedCheckout.total, phone, onMockPaid: async (receipt) => {
      await env.DB.prepare("UPDATE quiver_orders SET status = 'paid', payment_ref = ? WHERE order_id = ?").bind(receipt, orderId).run();
    } });
    const checkoutId = mpesaRes.CheckoutRequestID || '';
    await env.DB.prepare('UPDATE quiver_orders SET payment_ref = ? WHERE order_id = ?').bind(checkoutId, orderId).run();
    return json({ orderId, paymentMethod: 'mpesa', status: mpesaRes.isMock ? 'paid' : 'pending', nextAction: 'stk_push', checkoutRequestId: checkoutId, message: mpesaRes.CustomerMessage || 'STK Push sent successfully.', isMock: Boolean(mpesaRes.isMock) });
  }

  const quiverOrderMatch = path.match(/^\/api\/quiver\/orders\/([^/]+)$/);
  if (quiverOrderMatch && method === 'GET') {
    const order = await env.DB.prepare('SELECT order_id, total, status, payment_method, payment_ref, details_json, created_at FROM quiver_orders WHERE order_id = ?').bind(quiverOrderMatch[1]).first();
    if (!order) return json({ error: 'Order not found' }, 404);
    return json({ ...order, details: parseJson(order.details_json, {}) });
  }

  const orderMatch = path.match(/^\/api\/orders\/([^/]+)$/);
  if (orderMatch && method === 'GET') {
    const order = await env.DB.prepare('SELECT * FROM orders WHERE order_id = ?').bind(orderMatch[1]).first();
    if (!order) return json({ error: 'Order not found' }, 404);
    const { results: items = [] } = await env.DB.prepare('SELECT * FROM order_items WHERE order_id = ?').bind(orderMatch[1]).all();
    return json({ ...order, items });
  }

  if (path === '/api/admin/orders' && method === 'GET') {
    if (!await requireAdmin(request, env)) return json({ error: 'Admin authorization is required' }, 401);
    const { results = [] } = await env.DB.prepare('SELECT * FROM orders ORDER BY id DESC').all();
    return json(results);
  }

  if (path === '/api/payments/mpesa/callback' && method === 'POST') {
    if (env.MPESA_MODE === 'n8n' && env.N8N_CALLBACK_SECRET) {
      const incomingSecret = request.headers.get('x-callback-secret') || '';
      if (incomingSecret !== env.N8N_CALLBACK_SECRET) {
        return json({ error: 'Unauthorized' }, 401);
      }
    }
    const body = await readJson(request);
    const callbackData = body?.Body?.stkCallback;
    if (!callbackData) return json({ ResultCode: 1, ResultDesc: 'Invalid callback payload' }, 400);

    const checkoutRequestId = callbackData.CheckoutRequestID;
    if (callbackData.ResultCode === 0) {
      const metadata = callbackData.CallbackMetadata?.Item || [];
      const mpesaReceipt = metadata.find((item) => item.Name === 'MpesaReceiptNumber')?.Value || '';
      const order = await env.DB.prepare('SELECT order_id, status FROM orders WHERE payment_ref = ?').bind(checkoutRequestId).first();

      if (order && order.status === 'pending') {
        await env.DB.prepare("UPDATE orders SET status = 'paid', payment_ref = ? WHERE order_id = ?").bind(mpesaReceipt, order.order_id).run();
        await assignLicenseKeys(env, order.order_id);
      } else {
        const quiverOrder = await env.DB.prepare('SELECT order_id, status FROM quiver_orders WHERE payment_ref = ?').bind(checkoutRequestId).first();
        if (quiverOrder && quiverOrder.status === 'pending') {
          await env.DB.prepare("UPDATE quiver_orders SET status = 'paid', payment_ref = ? WHERE order_id = ?").bind(mpesaReceipt, quiverOrder.order_id).run();
        }
      }
    } else {
      await env.DB.prepare("UPDATE orders SET status = 'failed' WHERE payment_ref = ?").bind(checkoutRequestId).run();
      await env.DB.prepare("UPDATE quiver_orders SET status = 'failed' WHERE payment_ref = ?").bind(checkoutRequestId).run();
    }

    return json({ ResultCode: 0, ResultDesc: 'Accept Service' });
  }

  if (path === '/api/payments/paypal/capture' && method === 'POST') {
    const { paypalOrderId, orderId } = await readJson(request);
    if (!paypalOrderId) return json({ error: 'PayPal Order ID is required' }, 400);

    const captureRes = await capturePaypalOrder(env, paypalOrderId);
    if (captureRes.status !== 'COMPLETED') {
      await env.DB.prepare("UPDATE orders SET status = 'failed' WHERE order_id = ?").bind(orderId).run();
      return json({ status: 'failed', message: 'PayPal Capture was not completed' });
    }

    const captureId = captureRes.purchase_units?.[0]?.payments?.captures?.[0]?.id || paypalOrderId;
    await env.DB.prepare("UPDATE orders SET status = 'paid', payment_ref = ? WHERE order_id = ?").bind(captureId, orderId).run();
    await assignLicenseKeys(env, orderId);
    return json({ status: 'success', captureId });
  }

  const paystackMatch = path.match(/^\/api\/payments\/paystack\/verify\/([^/]+)$/);
  if (paystackMatch && method === 'GET') {
    const reference = paystackMatch[1];
    const verification = await verifyPaystackTransaction(env, reference);

    if (verification.data.status !== 'success') {
      await env.DB.prepare("UPDATE orders SET status = 'failed' WHERE order_id = ?").bind(reference).run();
      return json({ status: 'failed', message: 'Paystack transaction failed' });
    }

    const order = await env.DB.prepare('SELECT order_id, status FROM orders WHERE order_id = ?').bind(reference).first();
    if (order && order.status === 'pending') {
      await env.DB.prepare("UPDATE orders SET status = 'paid', payment_ref = ? WHERE order_id = ?").bind(`PSTK-${reference}`, reference).run();
      await assignLicenseKeys(env, reference);
    }

    return json({ status: 'success', reference });
  }

  if (path === '/api/payments/kopokopo/callback' && method === 'POST') {
    const { topic, attributes } = await readJson(request);
    if (topic === 'payment_received' && attributes?.status === 'Success') {
      const orderId = attributes.metadata?.order_id;
      const txnRef = attributes.transaction_reference;
      const order = await env.DB.prepare('SELECT status FROM orders WHERE order_id = ?').bind(orderId).first();
      if (order && order.status === 'pending') {
        await env.DB.prepare("UPDATE orders SET status = 'paid', payment_ref = ? WHERE order_id = ?").bind(txnRef, orderId).run();
        await assignLicenseKeys(env, orderId);
      }
    }

    return new Response('Webhook processed', { status: 200, headers: corsHeaders });
  }

  if (path === '/api/admin/settings' && method === 'GET') {
    if (!await requireAdmin(request, env)) return json({ error: 'Admin authorization is required' }, 401);
    return json(publicSettings(await getSettings(env), env));
  }

  if (path === '/api/admin/settings' && method === 'POST') {
    if (!await requireAdmin(request, env)) return json({ error: 'Admin authorization is required' }, 401);
    const settings = await readJson(request);
    for (const [key, value] of Object.entries(settings)) {
      if (!adminSettingKeys.has(key)) continue;
      await env.DB.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').bind(key, String(value)).run();
    }
    return json({ message: 'Settings updated successfully' });
  }

  const downloadMatch = path.match(/^\/api\/download\/([^/]+)\/(\d+)$/);
  if (downloadMatch && method === 'GET') {
    const [, orderId, productId] = downloadMatch;
    const order = await env.DB.prepare('SELECT status FROM orders WHERE order_id = ?').bind(orderId).first();
    if (!order) return json({ error: 'Order not found' }, 404);
    if (order.status !== 'paid') return json({ error: 'Payment is not verified for this download' }, 403);

    const product = await env.DB.prepare(
      'SELECT item.product_title, p.download_file FROM order_items item JOIN products p ON item.product_id = p.id WHERE item.order_id = ? AND item.product_id = ?'
    ).bind(orderId, productId).first();

    if (!product) return json({ error: 'Product not found in this order' }, 404);
    if (!env.ASSETS) return json({ error: 'Assets binding ASSETS is not configured' }, 500);

    const assetUrl = new URL(`/${product.download_file}`, request.url);
    const assetRes = await env.ASSETS.fetch(assetUrl);
    if (!assetRes.ok) return json({ error: 'Product download file is missing on the server' }, 404);

    await env.DB.prepare('UPDATE orders SET download_count = COALESCE(download_count, 0) + 1 WHERE order_id = ?').bind(orderId).run();

    const headers = new Headers(assetRes.headers);
    headers.set('Content-Disposition', `attachment; filename="${product.download_file.replace(/"/g, '')}"`);
    headers.set('Access-Control-Allow-Origin', '*');
    return new Response(assetRes.body, { status: assetRes.status, headers });
  }

  return json({ error: 'Not found' }, 404);
}

export default {
  async fetch(request, env) {
    try {
      return await route(request, env);
    } catch (error) {
      console.error(error);
      return json({ error: error.message || 'Internal server error' }, 500);
    }
  }
};
