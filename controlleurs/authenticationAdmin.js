const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Administration');

// eslint-disable-next-line consistent-return
exports.signupController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({
        errorMessage: 'Email already exists',
      });
    }

    const newAmin = new Admin();

    newAmin.email = email;

    const salt = await bcrypt.genSalt(10);
    newAmin.password = await bcrypt.hash(password, salt);

    await newAmin.save();

    res.json({
      successMessage: 'Registration success. Please signin.',
    });
  } catch (err) {
    console.log('signupController error: ', err);
    res.status(500).json({
      errorMessage: 'Server error',
    });
  }
};

// eslint-disable-next-line consistent-return
exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        errorMessage: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: 'Invalid credentials',
      });
    }

    const payload = {
      admin: {
        // eslint-disable-next-line no-underscore-dangle
        _id: admin._id,
      },
    };

    jwt.sign(
      payload,
      // eslint-disable-next-line no-undef
      SECRET_KEY,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) console.log('jwt error: ', err);
        // eslint-disable-next-line no-shadow
        const { _id, email, role } = admin;

        res.json({
          token,
          admin: { _id, email, role },
        });
      }
    );
  } catch (err) {
    console.log('signinController error: ', err);
    // eslint-disable-next-line no-undef
    res.status(500).json({ error: error.message });
  }
};
