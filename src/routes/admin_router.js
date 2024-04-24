const express = require('express');
const adminController = require('../controller/admin_controller.js');

const adminRouter = express.Router();

// adminRouter.post('/login', adminController.login);

module.exports = adminRouter;