const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, fullName: user.fullName, role: user.role }, 
    process.env.JWT_SECRET_KEY, 
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Handle token expiration
      console.log("Token expired");
    } else {
      // Handle other errors
      console.log("Invalid token");
    }
    return null;
  }
};

module.exports = { generateToken, verifyToken };
