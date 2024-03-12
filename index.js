const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Module 1: Setting Up the SQLite Database
const db = new sqlite3.Database('./jwtAuth.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  // Create the users table if it doesn't exist
  
});

// Module 2: Initializing the Node.js Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Module 3: Implementing User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // TODO: Perform basic validation checks

  // TODO: Hash the password using bcrypt

  // TODO: Store the user credentials in the database

  // TODO: Handle potential errors and send appropriate responses
});

// Module 4: Implementing User Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // TODO: Retrieve the user from the database based on the username

  // TODO: Compare the provided password with the hashed password using bcrypt

  // TODO: Generate a JSON Web Token (JWT) for authenticated users

  // TODO: Handle potential errors and send appropriate responses
});

// Module 5: Securing Routes with JWT Authentication
const authenticateToken = (req, res, next) => {
  // TODO: Extract the JWT from the request headers

  // TODO: Verify the JWT using the jsonwebtoken module

  // TODO: If the JWT is valid, attach the user information to the request object

  // TODO: If the JWT is invalid or not present, return an appropriate error response

};

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route, accessible only with a valid token.' });
});