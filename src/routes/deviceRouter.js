const express = require('express');
const deviceController = require('../controller/deviceController.js');

const deviceRouter = express.Router();

deviceRouter.get('/', deviceController.getDevices);
deviceRouter.get('/:id', deviceController.getDeviceById);
deviceRouter.get('/searchOrganization/:id', deviceController.getDeviceByOrganizationId);
deviceRouter.post('/', deviceController.createDevice);
deviceRouter.put('/:id', deviceController.updateDevice);
deviceRouter.delete('/:id', deviceController.deleteDevice);

module.exports = deviceRouter;