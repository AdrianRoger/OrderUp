const express =  require('express');
const categoryController = require('../controller/category_controller.js');

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getCategories);

module.exports = categoryRouter;