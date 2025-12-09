const express = require('express');
const adminController = require('./../controller/adminController');


const router = express.Router();

// page routes *****************************************************************
router.post('/signup',adminController.createAdmin)
  
  router
  .route('/login')
  .post(adminController.login)
  router
  .route('/register')
  .post(adminController.createAdmin)


module.exports = router;