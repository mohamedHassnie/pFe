const express = require('express');

const router = express.Router();
const {
  signupValidator,
  signinValidator,
  validatorResult,
} = require('../middleware/validator');
const {
  signupController,
  signinController,
} = require('../controlleurs/authenticationAdmin');

router.post('/signup', signupValidator, validatorResult, signupController);

router.post('/signin', signinValidator, validatorResult, signinController);

module.exports = {
  root: '/auth',
  router,
};
