const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password_hash TEXT,
        role TEXT DEFAULT 'student',
        interests TEXT,
        photo_url TEXT,
        bio TEXT,
        rating REAL DEFAULT 0,
        doubts_asked INTEGER DEFAULT 0,
        doubts_solved INTEGER DEFAULT 0,
        verified INTEGER DEFAULT 0,
        points INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS doubts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        description TEXT,
        subject TEXT,
        topic TEXT,
        image_url TEXT,
        request_type TEXT DEFAULT 'text',
        status TEXT DEFAULT 'open',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doubt_id INTEGER,
        from_user_id INTEGER,
        to_user_id INTEGER,
        stars REAL,
        comment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (doubt_id) REFERENCES doubts(id),
        FOREIGN KEY (from_user_id) REFERENCES users(id),
        FOREIGN KEY (to_user_id) REFERENCES users(id)
      )`);
    });
  }
});

module.exports = {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      const sqliteText = text.replace(/\$\d+/g, '?');
      db.all(sqliteText, params, (err, rows) => {
        if (err) {
          console.error("SQL Error: ", sqliteText, err);
          return reject(err);
        }
        resolve({ rows: rows || [] });
      });
    });
  },
};
