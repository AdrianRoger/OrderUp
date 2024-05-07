const express = require('express');
const adminController = require('../controller/AdminController.js');
const { joiSchemas, joiValidate } = require('../middlewares');

const admin = {
  createAdminSchema: joiSchemas.createAdminSchema(),
  updateAdminPasswordSchema: joiSchemas.updateAdminPasswordSchema(),
  updateAdminSchema: joiSchemas.updateAdminSchema()
}

const adminRouter = express.Router();

adminRouter.get('/', adminController.getAdmins);
adminRouter.get('/email/:email', adminController.getAdminByEmail);
adminRouter.get('/:id', adminController.getAdminById);
adminRouter.post('/', joiValidate.validate(admin.createAdminSchema), adminController.createAdmin);
adminRouter.patch('/:id', joiValidate.validate(admin.updateAdminPasswordSchema), adminController.updateAdminPassword);
adminRouter.put('/:id', joiValidate.validate(admin.updateAdminSchema), adminController.updateAdmin);
adminRouter.delete('/:id', adminController.deleteAdmin);

module.exports = adminRouter;