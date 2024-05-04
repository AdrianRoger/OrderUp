const express = require("express");
const productController = require('../controller/ProductController');
const { upload } = require("../middlewares");




const productRouter = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.get('/org/:organizationId', productController.getProductsByOrganizationId)
productRouter.post('/', upload.single('image'), productController.createProduct);
productRouter.put('/:id', upload.single('image'), productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;