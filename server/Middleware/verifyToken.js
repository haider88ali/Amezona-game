// middleware/verifyToken.js

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split the bearer token from the header
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Verify token
    jwt.verify(req.token, 'secret_key', (err, authData) => {
      if (err) {
        res.sendStatus(403); // Forbidden
      } else {
        // If token is valid, you can access authData which might contain user information
        req.authData = authData;
        next(); // Pass the control to the next middleware
      }
    });
  } else {
    // If no token, return Forbidden
    res.status(403).json({ message: 'authorization token required.' });
  }
}

module.exports = verifyToken;
