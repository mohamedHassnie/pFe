/* eslint-disable no-undef */
/* eslint-disable new-cap */
const bcrypt = require('bcryptjs');
const Markiting = require('../models/Markiting');

exports.signupMarkiting = async (req, res) => {
  try {
    const { UserName, LastName, email, password } = req.body;
    const markiting = await Markiting.findOne({ email });
    if (markiting) {
      res
        .status(404)
        .json({ message: `le compte de ${UserName} déja existe ` });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      res.status(201).json({ hash });
      const newMark = new Markiting({
        UserName,
        LastName,
        email,
        password: hash,
      });
      await newMark.save();
      res.json({
        successMessage: 'Registration success. Please signin.',
      });
    }
  } catch (e) {
    res.status(500).json({
      errorMessage: 'Server error',
    });
  }
};
exports.signinMarkiting = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const newMarkiting = await Markiting.findOne({ email });
    if (newMarkiting) {
      bcrypt
        .compare(password, newMarkiting.password)
        .then(async (match) => {
          if (!match) throw new createError(403, 'Password is not correct');

          const payload = {
            newMarkiting: {
              // eslint-disable-next-line no-underscore-dangle
              _id: newMarkiting._id,
            },
          };

          jwt.sign(
            payload,
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
                newMarkiting: { _id, email, role },
              });
            }
          );
          return res.status(200).json({ message: 'Welcome Admin!', token });
        })
        .catch((error) => {
          next(error);
        });
    } else {
      throw new createError(404, 'Email not found');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.deleteMarkiting = async (req, res) => {
  const { _id } = req.params;
  const markiting = await Markiting.findById(_id);
  // eslint-disable-next-line no-unused-expressions
  `Compte de  ${markiting} supprimé`;
  if (markiting) {
    await markiting.deleteOne({ _id });
    res.status(201).json({ msg: 'compte  supprimer' });
  } else {
    res.status(404).json({ msg: 'user not found' });
  }
};

exports.updateMarkiting = async (req, res) => {
  const markitingId = req.params.id.toString();

  const newMarkiting = req.body;
  if (Markiting.findOne({ _id: markitingId })) {
    try {
      const markiting = await Markiting.findOneAndUpdate(
        markitingId,
        newMarkiting
      );
      res.send(markiting).status(200);
    } catch (err) {
      res.send('invalid user id').status(409);
    }
  } else {
    res.send('user not found').status(409);
  }
};

exports.getMark = async (req, res) => {
  try {
    const results = await Markiting.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMarkId = async (req, res) => {
  Markiting.findById({ _id: req.params.id })
    // eslint-disable-next-line consistent-return
    .then((mark) => {
      if (!mark) {
        return res.status(404).json({ message: 'markiting not found!' });
      }
      res.status(200).send(mark);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.logout = async (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('login');
};
