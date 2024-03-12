// Module 1: Initializing the Node.js Server



// Module 2: Setting Up the SQLite Database
// const db = new sqlite3.Database('./jwtAuth.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  
//   console.log('Connected to the SQLite database.');
// });

// db.serialize(() => {
//   // Create the users table if it doesn't exist
  
// });




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


/***************************************
 *
 *
 *
 *
 * Do not change any code below this line
 *
 *
 *
 ****************************************/

app.get('/', (req, res) => {
	res.status(200).send('Success')
})


app.get('/isDatabaseAsExpected', async (req,res) => {
  const result = await new Promise((resolve, reject) => {
    db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="users"', (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });


  res.status(200).send(result)
})