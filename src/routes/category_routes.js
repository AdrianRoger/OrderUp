const express =  require('express');
const categoryController = require('../controller/CategoryController.js');

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;