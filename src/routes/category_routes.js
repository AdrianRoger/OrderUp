const express =  require('express');
const categoryController = require('../controller/category_controller.js');

const categoryRouter = express.Router();

categoryRouter.get("/:organization_id", categoryController.getCategories);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;