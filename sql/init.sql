CREATE TABLE IF NOT EXISTS users (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,  -- lowercase
    name TEXT,
    is_student INTEGER NOT NULL DEFAULT 0,
    login_code TEXT,
    login_expires REAL
);

CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,  -- lowercase
    name TEXT
);

CREATE TABLE IF NOT EXISTS types (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS locations (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS infractions (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL,
    type_id INTEGER NOT NULL,
    location_id INTEGER NOT NULL,
    notes TEXT,
    created_at REAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (type_id) REFERENCES types(id),
    FOREIGN KEY (location_id) REFERENCES locations(id)
);
CREATE INDEX idx_infractions_user_id ON infractions(user_id);
CREATE INDEX idx_infractions_teacher_id ON infractions(teacher_id);
CREATE INDEX idx_infractions_type_id ON infractions(type_id);
CREATE INDEX idx_infractions_location_id ON infractions(location_id);
