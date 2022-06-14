const express = require('express');

const router = express.Router();
const upload = require('../config/uploads');
const {
  signupMarkiting,
  signinMarkiting,
  deleteMarkiting,
  updateMarkiting,
  getMark,
  getMarkId,
  logout,
} = require('../controlleurs/AnalysteControllers');

router.post(
  '/inscritMarkiting',
  upload.single('MarkitingImage'),
  signupMarkiting
);

router.post('/loginMarkiting', signinMarkiting);

router.delete('/deleteMarkiting/:_id', deleteMarkiting);
router.put('/UpdateMarkiting/:id', updateMarkiting);
router.get('/getMarkiting', getMark);
router.get('/getMarkitingId/:id', getMarkId);

router.get('/logout', logout);

module.exports = {
  root: '/marketing',
  router,
};
