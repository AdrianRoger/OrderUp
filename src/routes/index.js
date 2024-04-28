const express = require('express');
const adminRouter = require('./adminRoutes.js');
const deviceRouter = require('./deviceRoutes.js');
const categoryRouter = require("./categoryRoutes.js");
const orderingRouter = require("./orderingRoutes.js");
const orderingProductsRouter = require("./orderingProductsRoutes.js");
const organizationRouter = require("./organizationRoutes.js");
const loginRouter = require('./loginRoutes.js');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/categories', categoryRouter);
router.use('/ordering-products',orderingProductsRouter);
router.use('/orderings', orderingRouter);
router.use('/device', deviceRouter);
router.use('/organization', organizationRouter);
router.use('/admin', adminRouter);


module.exports = router;
