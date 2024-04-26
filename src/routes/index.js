const express = require("express");
const router = express.Router();
const categoryRouter = require("./category_routes.js");
const orderingRouter = require("./ordering_routes.js");
const orderingProductsRouter = require("./ordering_products_routes.js");
const adminRouter = require("./admin_router.js");
const organizationRouter = require("./organization_router.js");

router.use("/categories", categoryRouter);
router.use("/ordering_products",orderingProductsRouter);
router.use("/orderings", orderingRouter);
router.use("/user", adminRouter);
router.use("/organization", organizationRouter);

module.exports = router;
