const express = require('express');
const router = express.Router();
const categoryRouter = require('./category_routes.js'); 
const adminRouter = require('./admin_router.js');
const organizationRouter = require('./organization_router.js');

router.use('/categories', categoryRouter);
router.use('/user', adminRouter);
router.use('/organization', organizationRouter);

module.exports = router;