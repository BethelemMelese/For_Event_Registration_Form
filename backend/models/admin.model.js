const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please insert UserName"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("Admin", adminSchema);
