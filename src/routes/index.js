const express = require('express');
const adminRouter = require('./admin_router.js');
const dinningTableRouter = require('./DinningTableRouter.js');
const deviceRouter = require('./DeviceRouter.js');
const categoryRouter = require("./category_routes.js");
const orderingRouter = require("./ordering_routes.js");
const orderingProductsRouter = require("./ordering_products_routes.js");
const organizationRouter = require("./organization_router.js");

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/ordering_products",orderingProductsRouter);
router.use("/orderings", orderingRouter);
router.use('/user', adminRouter);
router.use('/dinningTable', dinningTableRouter);
router.use('/device', deviceRouter);
router.use('/organization', organizationRouter);
router.use('/admin', adminRouter);


module.exports = router;
