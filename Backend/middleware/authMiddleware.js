const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Remove "Bearer " if present
    const cleanedToken = token.replace("Bearer ", "");

    const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET);

    req.user = decoded;   // attach user data to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;

