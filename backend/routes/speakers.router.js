const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  getSpeakers,
  getSpeakersForAll,
  addSpeakers,
  updateSpeakers,
  deleteSpeakers,
} = require("../controllers/speaker.controller.js");
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
router.get("/", verificationToken, getSpeakers);
router.get("/allSpeaker", getSpeakersForAll);
router.post("/", verificationToken, upload.single("file"), addSpeakers);
router.put("/:id", verificationToken, upload.single("file"), updateSpeakers);
router.delete("/:id", verificationToken, deleteSpeakers);

module.exports = router;
