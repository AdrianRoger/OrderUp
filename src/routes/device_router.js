const express = require('express');
const deviceController = require('../controller/device_controller.js');

const deviceRouter = express.Router();

deviceRouter.get('/', deviceController.list);
deviceRouter.get('/:id', deviceController.getDeviceById);
deviceRouter.get('/searchOrganization/:id', deviceController.getDeviceToOrganizationId);
deviceRouter.post('/', deviceController.create);
deviceRouter.put('/:id', deviceController.update);
deviceRouter.delete('/:id', deviceController.delete);

module.exports = deviceRouter;