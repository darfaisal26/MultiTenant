
const bcrypt = require('bcryptjs');
const UserModelFactory = require('../models/userModel');
const { createToken } = require('../utils/createToken'); 

exports.registerUser = async (db, { email, password }) => {
  const User = UserModelFactory(db);

  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');

  const user = new User({ email, password });
  await user.save();

  return user;
};

exports.loginUser = async (db, { email, password }, tenantId) => {
  const User = UserModelFactory(db);

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = createToken(user._id, tenantId);
  return token;
};

exports.logoutUser = async (db, userId) => {
  const User = UserModelFactory(db);
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.lastLogoutAt = new Date();
  await user.save();

  return true;
};
