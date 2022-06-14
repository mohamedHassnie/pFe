const express = require('express');

const router = express.Router();

const {
  deletePatient,
  inscritPatient,
  updatePatientId,
  getPatient,
  getPatientId,
} = require('../controlleurs/PatientControllers');

router.post('/incritPatient', inscritPatient);

router.delete('/deleteUser/:_id', deletePatient);

router.put('updatepatient/:id', updatePatientId);

router.get('/getPatient', getPatient);

router.get('/getPatientId/:id', getPatientId);

module.exports = {
  root: '/patient',
  router,
};
