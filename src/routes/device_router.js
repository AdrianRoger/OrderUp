const express = require('express');
const deviceController = require('../controller/device_controller.js');

const deviceRouter = express.Router();

deviceRouter.get('/', deviceController.list);
deviceRouter.get('/:id', deviceController.getDeviceById);

module.exports = deviceRouter;