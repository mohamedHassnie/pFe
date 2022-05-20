const express = require("express");
const router = express.Router();
const User = require("../models/user");
const nodemailer = require("nodemailer");
const {
  signupValidator,
  signinValidator,
  validatorResult,
} = require("../middleware/validator");
router.post("/incritPatient", async (req, res) => {
  try {
    const {
      email,
      Name,
      ID_Passport,
      Nationality,
      Gender,
      Date_of_birth,

      Contact_number,
      Physical_Address,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }
    const newUser = new User({
      email,
      Name,
      ID_Passport,
      Nationality,
      Gender,
      Date_of_birth,
      Contact_number,
      Physical_Address,
    });
    await newUser.save();

    res.json({
      successMessage: "Registration success. Please signin.",
    });
    var smtpConfig = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL,
      // you can try with TLS, but port is then 587
      auth: {
        user: "benhessine7@gmail.com",
        pass: "clubafricain",
      },
    };

    var transporter = nodemailer.createTransport(smtpConfig);
    // replace hardcoded options with data passed (somedata)
    var mailOptions = {
      from: "benhessine7@gmail.com", // sender address
      to: newUser.email, // list of receivers
      subject: "Hello ,verify your email ✔", // Subject line
      text: "this is some text", //, // plaintext body
      html: `<h2>${newUser.Name} Thanks for regestring on our site</h2>`, // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      try {
        if (err) {
          throw err;
        } else {
          console.log("info :" + info.response);
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (err) {
    console.log(" error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
});
router.delete("/deleteUser/:_id", async (req, res) => {
  const { _id } = req.params;
  const markiting = await User.findById(_id);

  if (markiting) {
    await markiting.deleteOne({ _id });
    res.status(201).json({ msg: "compte supprimer" });
  } else {
    res.status(404).json({ msg: "user not found" });
  }
});
router.put(
  "/user/:id",
  signupValidator,
  signinValidator,
  validatorResult,
  async (req, res) => {
    var userId = req.params.id.toString();
    const newUser = req.body;
    if (User.findOne({ _id: userId })) {
      try {
        const user = await User.findOneAndUpdate(userId, newUser);
        res.send(user).status(200);
      } catch (err) {
        res.send("invalid user id").status(409);
      }
    } else {
      res.send("user not found").status(409);
    }
  }
);
router.get("/getUser", async (req, res) => {
  try {
    const results = await User.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get(
  "/getUserId/:id",
  (async = (req, res) => {
    User.findById({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  })
);

module.exports = router;
