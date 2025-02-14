const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  getHeroSections,
  getHeroSectionsForAll,
  addHeroSections,
  updateHeroSections,
  deleteHeroSections,
} = require("../controllers/heroSection.controller.js");
const { verificationToken } = require("../controllers/admin.controller.js");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.js");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "speakers-images",
    format: async (req, file) => "jpg" || "png" || "jpeg",
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });
router.get("/", verificationToken, getHeroSections);
router.get("/get", getHeroSectionsForAll);
router.post("/", verificationToken, upload.single("file"), addHeroSections);
router.put(
  "/:id",
  verificationToken,
  upload.single("file"),
  updateHeroSections
);
router.delete("/:id", verificationToken, deleteHeroSections);

module.exports = router;
