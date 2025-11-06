CREATE TABLE users (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,  -- lowercase
    login_code TEXT,
    login_expires REAL
);
