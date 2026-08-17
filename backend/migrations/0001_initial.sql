CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  category TEXT,
  price REAL,
  image_url TEXT,
  download_file TEXT,
  license_keys TEXT,
  system_req TEXT
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  total REAL,
  status TEXT,
  payment_method TEXT,
  payment_ref TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT,
  product_id INTEGER,
  product_title TEXT,
  price REAL,
  license_key TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

INSERT OR IGNORE INTO admin_users (username, password)
VALUES ('admin', '240be518fabd2724d4acaa004ececb03d07e7c82af559cc9716b329527ca4f35');

INSERT OR IGNORE INTO products (id, title, description, category, price, image_url, download_file, license_keys, system_req) VALUES
(1, 'CyberQuest 2077', 'A premium sci-fi open-world action RPG set in the mega-city of the future. Customize your cybernetics, explore endless neon streets, and make choices that shape the narrative.', 'gaming', 7800, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop', 'cyberquest_2077_installer.exe', '["CYBER-Q98A-38X1-KLS8","CYBER-27X9-10PA-LQ92","CYBER-77PL-99AA-ZZ01"]', '{"os":"Windows 10/11 64-bit","processor":"Intel Core i7-8700K or AMD Ryzen 5 3600X","memory":"16 GB RAM","graphics":"NVIDIA GeForce RTX 2060 or AMD Radeon RX 5700 XT","storage":"70 GB available space"}'),
(2, 'AstroRiders', 'High-speed multiplayer anti-gravity racing across neon tracks suspended in deep space. Experience extreme physics, custom spacecraft, and a pumping electronic soundtrack.', 'gaming', 2600, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop', 'astroriders_setup.exe', '["ASTRO-RIDER-8902","ASTRO-RIDER-7711","ASTRO-RIDER-3498"]', '{"os":"Windows 10 64-bit","processor":"Intel Core i5-4590 or AMD FX 8350","memory":"8 GB RAM","graphics":"NVIDIA GeForce GTX 970 or AMD Radeon R9 290","storage":"12 GB available space"}'),
(3, 'CodeBreaker', 'A hacking and grid-decryption puzzle game. Write short logic commands, bypass security firewalls, and uncover a dark corporate conspiracy in a stylized terminal-style UI.', 'gaming', 1300, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop', 'codebreaker_level_editor.exe', '["CDB-FREE-KEY-888","CDB-LICENSE-999","CDB-DEV-KEY-111"]', '{"os":"Windows 7/8/10/11","processor":"1.6 GHz Dual Core","memory":"4 GB RAM","graphics":"Intel HD Graphics 4000","storage":"500 MB available space"}'),
(4, 'BraneOS Dev Suite', 'The ultimate power environment for web and systems developers. Comes with built-in virtualization containers, an offline syntax documentation database, and a highly customizable GPU-accelerated terminal.', 'software', 16900, 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop', 'braneos_dev_suite_x64.zip', '["BRN-DEV-98X2-K9A1","BRN-DEV-77P1-LK88","BRN-DEV-34MM-QQ91"]', '{"os":"Windows 10/11 Pro 64-bit","processor":"Intel Core i7 or AMD Ryzen 7","memory":"32 GB RAM","graphics":"Integrated or Dedicated GPU (supports Vulkan)","storage":"15 GB available space"}'),
(5, 'Antivirus Pro 2026', 'Real-time AI-powered protection against malware, ransomware, and network intrusions. Features lightweight background scans and a secure sandbox environment for running suspicious executables.', 'software', 3900, 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop', 'antivirus_pro_2026.msi', '["AV-PRO-2026-X1","AV-PRO-2026-Y2","AV-PRO-2026-Z3"]', '{"os":"Windows 10/11","processor":"1 GHz Processor","memory":"2 GB RAM","graphics":"DirectX 9 or later","storage":"2 GB available space"}'),
(6, 'OfficeGrid Suite', 'A fully offline-first alternative to document, spreadsheet, and slide creation. Includes advanced mathematical modelling sheets and exports to all open standards securely.', 'software', 6500, 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop', 'officegrid_pro.msi', '["OG-SUITE-45A9-BB22","OG-SUITE-12L9-MM38","OG-SUITE-99V0-PZ10"]', '{"os":"Windows 8.1/10/11","processor":"1.4 GHz Processor","memory":"4 GB RAM","graphics":"DirectX 10 compatible","storage":"4 GB available space"}'),
(7, 'SambaPOS 5.3.6 Setup', 'SambaPOS 5.3.6 Setup is a point-of-sale software designed for restaurants, cafes, and bars.', 'software', 30, '', 'sambapos_5.3.6_setup.exe', '[]', '{}');

INSERT OR IGNORE INTO settings (key, value) VALUES
('MPESA_SHORTCODE', ''),
('MPESA_CALLBACK_URL', ''),
('MPESA_ENV', 'sandbox'),
('PAYPAL_CLIENT_ID', ''),
('PAYPAL_ENV', 'sandbox'),
('PAYSTACK_PUBLIC_KEY', ''),
('KOPOKOPO_CLIENT_ID', ''),
('KOPOKOPO_ENV', 'sandbox'),
('KOPOKOPO_SERVICE_CO_REF', '');
