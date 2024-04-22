const express = require('express');
const dinningTableController = require('../controller/DinningTableController.js');

const dinningTableRouter = express.Router();

dinningTableRouter.get('/', dinningTableController.getDinningTable);
dinningTableRouter.get('/searchTable/:id', dinningTableController.getDinningTableById);
dinningTableRouter.get('/searchDevice/:id', dinningTableController.getDinningTableByDeviceId);
dinningTableRouter.post('/', dinningTableController.createDinningTable);
dinningTableRouter.put('/:id', dinningTableController.updateDinningTable);
dinningTableRouter.delete('/:id', dinningTableController.deleteDinningTable);

module.exports = dinningTableRouter;