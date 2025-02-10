const express = require("express");
const router = express.Router();

const {
  LoginAdmin,
  RegisterAdmin,
  updatePassword,
  verificationToken,
} = require("../controllers/admin.controller.js");

router.post("/login", LoginAdmin);
router.post("/", RegisterAdmin);
router.put("/changePassword/:id", verificationToken,updatePassword);

module.exports = router;
