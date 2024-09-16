const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if the header exists
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Split the header to get the token part only
  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

  // Check if the token is present
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle invalid token
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
