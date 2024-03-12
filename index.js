const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Module 1: Setting Up the SQLite Database
const db = new sqlite3.Database('./jwtAuth.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  // Create the users table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);
});

// Module 2: Initializing the Node.js Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Module 3: Implementing User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Perform basic validation checks
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user credentials in the database
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, hashedPassword], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).send('User registered successfully');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Module 4: Implementing User Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Retrieve the user from the database based on the username
  const sql = `SELECT * FROM users WHERE username = ?`;
  db.get(sql, [username], async (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    try {
      // Compare the provided password with the hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).send('Invalid username or password');
      }

      // Generate a JSON Web Token (JWT) for authenticated users
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Module 5: Securing Routes with JWT Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }

    req.user = user;
    next();
  });
};

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route, accessible only with a valid token.' });
});