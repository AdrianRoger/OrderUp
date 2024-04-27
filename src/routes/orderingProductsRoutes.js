const express = require("express");
const orderingProductController = require("../controller/OrderingProductController.js");

const orderingProductRouter = express.Router();

orderingProductRouter.get("/",orderingProductController.getOrderingProducts);
orderingProductRouter.post("/",orderingProductController.createOrderingProduct);
orderingProductRouter.put("/",orderingProductController.updateOrderingProduct);
orderingProductRouter.delete("/",orderingProductController.deleteOrderingProduct);


module.exports = orderingProductRouter;