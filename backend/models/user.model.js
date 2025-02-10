const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please insert First Name"],
    },
    lastName: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
