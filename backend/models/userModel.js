const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports = (conn) => {
  if (conn.models && conn.models.User) {
    return conn.models.User;
  }
  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogoutAt: { type: Date, default: null },
  });

  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  return conn.model("User", userSchema);
};
