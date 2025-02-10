const express = require("express");
const router = express.Router();

const {
  LoginAdmin,
  RegisterAdmin,
  updatePassword,
  verificationToken,
  getUserByToken
} = require("../controllers/admin.controller.js");

router.post("/login", LoginAdmin);
router.post("/", RegisterAdmin);
router.put("/changePassword/:id", verificationToken, updatePassword);
router.get("/UserInfo/:token", verificationToken, getUserByToken);

module.exports = router;
