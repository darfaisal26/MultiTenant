const jwt = require('jsonwebtoken');
const UserModelFactory = require('../models/userModel');

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.tenantId !== req.tenantId) {
      return res.status(403).json({ message: "Tenant mismatch" });
    }

    const User = UserModelFactory(req.db);
    const user = await User.findById(decoded.userId);
    if (user.lastLogoutAt && decoded.iat * 1000 < user.lastLogoutAt.getTime()) {
      return res.status(401).json({ message: "Token revoked" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
};
