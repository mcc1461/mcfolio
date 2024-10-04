const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      message:
        "Access denied. No token provided. Please LOG IN to access this page.",
    });
  }

  // Split the header to get the token part only
  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

  // Check if the token is present
  if (!token) {
    return res.status(401).json({
      message:
        "Access denied. No token provided. Please LOG IN to access this page.",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token data to req.user
    next(); // Call the next middleware or route handler
  } catch (error) {
    // Handle invalid token
    return res.status(403).json({
      message:
        "Invalid token or your session has expired. Please LOG IN again.",
    });
  }
};

module.exports = authMiddleware;
