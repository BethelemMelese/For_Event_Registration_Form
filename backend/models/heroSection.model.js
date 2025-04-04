const mongoose = require("mongoose");

const heroSectionSchema = mongoose.Schema(
  {
    headerTitle: {
      type: String,
      required: [true, "Please insert the Header Title"],
    },
    subTitle: {
      type: String,
      required: false,
    },
    heroImage: {
      type: String,
      required: [true, "Please insert the Hero Image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HeroSection", heroSectionSchema);
