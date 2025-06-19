
const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    await authService.registerUser(req.db, req.body);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ message: 'Register error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.db, req.body, req.tenantId);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: 'Login error', error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await authService.logoutUser(req.db, req.user.userId);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Logout error', error: err.message });
  }
};
;
