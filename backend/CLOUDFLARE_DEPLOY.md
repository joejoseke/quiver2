# Cloudflare Wrangler Deployment

This backend now has a Cloudflare Workers entrypoint at `src/worker.mjs`. The original Express server is still available through `npm start`, but Wrangler deploys the Worker.

## One-time Cloudflare setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Create a D1 database:
   ```sh
   npx wrangler d1 create brane-shop-db
   ```

3. Copy the returned `database_id` into `wrangler.jsonc`, replacing `REPLACE_WITH_D1_DATABASE_ID`.

4. Apply the schema and seed data locally:
   ```sh
   npm run d1:migrate:local
   ```

5. Apply the schema and seed data to Cloudflare:
   ```sh
   npm run d1:migrate:remote
   ```

6. Test locally:
   ```sh
   npm run dev
   ```

7. Deploy:
   ```sh
   npm run deploy
   ```

## Important notes

- Product downloads are served from the `uploads` directory using the Worker assets binding.
- The Worker uses D1 instead of the old MySQL/SQLite Node code, because Workers do not support normal Node database sockets or local filesystem writes.
- Default admin login is still `admin` / `admin123`; change it before production use.
- Payment settings are seeded blank for safety. Configure live keys in `/api/admin/settings` or by editing the D1 `settings` table.

## Simplified checkout

Use one endpoint for both payment choices:

```http
POST /api/orders/checkout
Content-Type: application/json
```

```json
{
  "email": "customer@example.com",
  "phone": "0712345678",
  "paymentMethod": "mpesa",
  "cartItems": [{ "id": 1, "qty": 1 }]
}
```

- For M-Pesa, set `paymentMethod` to `mpesa`. The response has `nextAction: "stk_push"` and `checkoutRequestId`.
- For card payments, set `paymentMethod` to `card`. The response has `nextAction: "redirect"` and `authorizationUrl` for the frontend to open.
- `paystack`, `credit_card`, and `debit_card` are accepted as aliases for `card`.
