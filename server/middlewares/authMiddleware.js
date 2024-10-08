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

    // Check if the user is an admin
    if (!decoded.isAdmin) {
      return res.status(403).json({
        message:
          "Access denied. You do not have the required privileges to access this page.",
      });
    }

    // Attach the decoded user data to req object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token
    return res.status(401).json({
      message:
        "Invalid token or your session has expired. Please LOG IN again.",
    });
  }
};

module.exports = authMiddleware;
