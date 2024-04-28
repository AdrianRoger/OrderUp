const express = require('express');
const adminController = require('../controller/AdminController.js');

const adminRouter = express.Router();

adminRouter.get('/', adminController.getAdmins);
adminRouter.get('/email/:email', adminController.getAdminByEmail);
adminRouter.get('/:id', adminController.getAdminById);
adminRouter.post('/', adminController.createAdmin);
adminRouter.put('/:id', adminController.updateAdmin);
adminRouter.delete('/:id', adminController.deleteAdmin);

// adminRouter.post('/login', adminController.login);

module.exports = adminRouter;