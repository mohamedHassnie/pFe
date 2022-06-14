/* eslint-disable new-cap */
const bcrypt = require('bcryptjs');
const Analyste = require('../models/Analyste');

exports.inscritAnalyste = async (req, res) => {
  const { UserName, LastName, email, password } = req.body;

  const { filename } = req.files;
  try {
    const analyste = await Analyste.findOne({ password });
    if (analyste) {
      res
        .status(404)
        .json({ message: `le compte de ${UserName} déja existe ` });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    res.status(201).json({ hash });
    const newAnalyste = new Analyste({
      filename,
      UserName,
      LastName,
      email,
      password: hash,
    });
    await newAnalyste.save();
    res.json({
      successMessage: 'Registration success. Please signin.',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errorMessage: 'Server error',
    });
  }
};
exports.loginAnalyste = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const newAnalyste = await Analyste.findOne({ email });
    if (newAnalyste) {
      bcrypt
        .compare(password, newAnalyste.password)
        .then(async (match) => {
          // eslint-disable-next-line no-undef
          if (!match) throw new createError(403, 'Password is not correct');
          // eslint-disable-next-line no-undef
          const token = jwt.sign(
            // eslint-disable-next-line no-undef
            { id: newAnalyste.id, email: newAnalyste.email },
            // eslint-disable-next-line no-undef
            SECRET_KEY,
            {
              expiresIn: '2h',
            }
          );
          return res.status(200).json({ message: 'Welcome Admin!', token });
        })
        .catch((error) => {
          console.error(error);
          next(error);
        });
    } else {
      // eslint-disable-next-line no-undef
      throw new createError(404, 'Email not found');
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.suppressionController = async (req, res) => {
  const { _id } = req.params;
  const newAnalyste = await Analyste.findById(_id);
  // eslint-disable-next-line no-unused-expressions
  `Compte de  ${newAnalyste} supprimé`;
  // eslint-disable-next-line no-undef
  if (newAnalyste) {
    await newAnalyste.deleteOne({ _id });
    res.status(201).json({ msg: 'compte  supprimer' });
  } else {
    res.status(404).json({ msg: 'user not found' });
  }
};

exports.putControllers = async (req, res) => {
  const analysteId = req.params.id.toString();
  const newAnalyste = req.body;
  if (Analyste.findOne({ _id: analysteId })) {
    try {
      const analyste = await Analyste.findOneAndUpdate(analysteId, newAnalyste);
      res.send(analyste).status(200);
    } catch (err) {
      res.send('invalid user id').status(409);
    }
  } else {
    res.send('user not found').status(409);
  }
};

exports.getControllers = async (req, res) => {
  try {
    const results = await Analyste.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
