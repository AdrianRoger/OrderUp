const express = require("express");
const orderingController = require("../controller/ordering_controller.js");

const orderingRouter = express.Router();

orderingRouter.get("/",orderingController.getOrderingsByTable);
orderingRouter.get("/:id",orderingController.getOrderingById);
orderingRouter.post("/",orderingController.createOrdering);
orderingRouter.put("/:id",orderingController.updateOrdering);
orderingRouter.delete("/:id",orderingController.deleteOrdering);

module.exports = orderingRouter;
