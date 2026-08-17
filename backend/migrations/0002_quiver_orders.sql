CREATE TABLE IF NOT EXISTS quiver_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  total REAL NOT NULL,
  status TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_ref TEXT,
  details_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_quiver_orders_payment_ref ON quiver_orders(payment_ref);
