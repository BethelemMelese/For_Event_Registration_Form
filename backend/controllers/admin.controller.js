const Admin = require("../models/admin.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { decode } = require("html-entities");

const RegisterAdmin = async (req, res) => {
  try {
    if (isExistAdmin == null) {
      const saltRounds = 10;
      const password = bcrypt.hashSync(req.body.password, saltRounds);
      const Admin = await Admin.create({
        userName: req.body.userName,
        passwordHash: password,
      });

      res.status(200).json({
        id: Admin._id,
        userName: Admin.userName,
        passwordHash: Admin.passwordHash,
      });
    } else {
      res.status(500).json({ message: "The Admin already exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Admin = await Admin.findOne({ email });
    if (!Admin) {
      return res
        .status(404)
        .json({ message: "Admin is not Found, Please insert correctly !" });
    }

    const generateToken = jwt.sign(
      {
        id: Admin._id,
        time: Date(),
        name:
          req.body.firstName +
          " " +
          req.body.middleName +
          " " +
          req.body.lastName,
        email: req.body.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600000,
      }
    );

    const isPasswordMatch = bcrypt.compareSync(password, Admin.passwordHash);

    if (Admin && isPasswordMatch) {
      await Admin.findByIdAndUpdate(Admin._id, {
        token: generateToken,
      });

      const updatedAdmin = await Admin.findOne({ email });
      res.status(200).json({
        message: "Login is Successfully Done !",
        token: updatedAdmin.token,
        name: updatedAdmin.firstName,
      });
    } else if (!isPasswordMatch) {
      res.status(404).json({
        message:
          "The Password is Not Correct, Please insert the correct password !",
      });
    } else {
      res.status(404).json({
        error: "Admin is not Found, Please insert correctly !",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={
    LoginAdmin,
    RegisterAdmin
}
