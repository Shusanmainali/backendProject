const jwt = require("jsonwebtoken");

// Verify token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token." });
  }
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};
