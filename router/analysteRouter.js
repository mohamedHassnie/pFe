const express = require('express');

const router = express.Router();

const upload = require('../config/uploads');
const {
  inscritAnalyste,
  loginAnalyste,
  suppressionController,
  putControllers,
  getControllers,
} = require('../controlleurs/AnalysteControllers');

// router.post(
//   '/inscritAnalyste',
//   upload.single('AnalysteImage'),
//   inscritAnalyste
// );
router.post('/loginAnalyste', loginAnalyste);

router.delete('/deleteMarkiting/:_id', suppressionController);
router.put('/UpdateMark/:id', putControllers);
router.get('/getMarkiting', getControllers);

module.exports = {
  root: '/analyste',
  router,
};
