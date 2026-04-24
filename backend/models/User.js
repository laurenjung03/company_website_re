const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isLoggedIn: { type: Boolean, default: false },
    isActive: {
      type: Boolean,
      default: true,
    },
    failedLoginAttempt: {
      type: Number,
      default: 0,
    },
    lastLoginAttempt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
