const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/client"); // Adjust path to client.js

// Protect route - Ensure user is authenticated
const protect = async (req, res, next) => {
  let token;

  // Check if there's an authorization header with the Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get user data
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database using the decoded ID
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      // If user does not exist, return a 404 error
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Proceed to the next middleware/route
      next();
    } catch (error) {
      // Token verification failed
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token is found
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin-only route - Ensure user has admin role
const admin = (req, res, next) => {
  // Check if user exists and has an admin role
  if (req.user && req.user.role === "en/admin") {
    return next(); // Allow access if the user is an admin
  }

  // If not an admin, return a 403 forbidden response
  return res.status(403).json({ message: "Not authorized as an admin" });
};

module.exports = { protect, admin };
