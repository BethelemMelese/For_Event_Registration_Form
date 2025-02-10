const Admin = require("../models/admin.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterAdmin = async (req, res) => {
  try {
    console.log("req.body...", req.body);
    const saltRounds = 10;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const admin = await Admin.create({
      userName: req.body.userName,
      passwordHash: password,
    });

    res.status(200).json({
      id: admin._id,
      userName: admin.userName,
      passwordHash: admin.passwordHash,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const LoginAdmin = async (req, res) => {
  try {
    console.log("req.body...",req.body);
    const { userName, password } = req.body;
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin is not Found, Please insert correctly !" });
    }

    const generateToken = jwt.sign(
      {
        id: admin._id,
        time: Date(),
        name: userName,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600000,
      }
    );

    const isPasswordMatch = bcrypt.compareSync(password, admin.passwordHash);

    if (admin && isPasswordMatch) {
      await Admin.findByIdAndUpdate(admin._id, {
        token: generateToken,
      });

      const updatedAdmin = await Admin.findOne({ userName });
      res.status(200).json({
        message: "Login is Successfully Done !",
        token: updatedAdmin.token,
        name: updatedAdmin.userName,
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

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(id);
    if (admin == null) {
      return res
        .status(404)
        .json({ message: "User is not Found, Please insert correctly !" });
    } else {
      const isPasswordMatch = bcrypt.compareSync(
        oldPassword,
        admin.passwordHash
      );
      if (!isPasswordMatch) {
        return res.status(404).json({
          message:
            "The Old Password not Correct, please insert the old password correctly!",
        });
      }
      const saltRounds = 10;
      bcrypt.hashSync(newPassword, saltRounds);
      res.status(200).json({ message: "Password is Successfully Updated !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verificationToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  LoginAdmin,
  RegisterAdmin,
  updatePassword,
  verificationToken,
};
