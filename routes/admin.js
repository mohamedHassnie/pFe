const express = require("express");
const Admin = require("../models/Administration");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const bcrypt = require("bcryptjs");
const router = express.Router();
var SECRET_KEY = "AZyWmZ1456@TOOP";

router.post("/loginAdmin", async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  try {
    const admin = await Admin.findOne({ email: email });
    console.log("eeee", admin);
    if (admin) {
      bcrypt
        .compare(password, admin.password)
        .then(async (match) => {
          if (!match) throw new createError(403, "Password is not correct");
          const token = jwt.sign(
            { id: admin.id, email: admin.email, role: role.role },
            SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({ message: "Welcome Admin!", token });
        })
        .catch((error) => {
          console.error(error);
          next(error);
        });
    } else {
      throw new createError(404, "Email not found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/hash", async (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const hash = bcrypt.hashSync(password, salt);
    res.status(201).json({ hash });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
