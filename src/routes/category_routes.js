const express =  require('express');
const categoryController = require('../controller/category_controller.js');

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.put("/:id", categoryController.updateCategoryById);

module.exports = categoryRouter;