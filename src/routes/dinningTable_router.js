const express = require('express');
const dinningTableController = require('../controller/dinningTable_controller.js');

const dinningTableRouter = express.Router();

dinningTableRouter.get('/', dinningTableController.list);
dinningTableRouter.get('/searchTable/:id', dinningTableController.getDinningTableById);
dinningTableRouter.get('/searchDevice/:id', dinningTableController.getDinningTableToDeviceId);
dinningTableRouter.post('/', dinningTableController.create);
dinningTableRouter.put('/:id', dinningTableController.update);
dinningTableRouter.delete('/:id', dinningTableController.delete);

module.exports = dinningTableRouter;