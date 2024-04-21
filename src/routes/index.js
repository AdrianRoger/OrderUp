const express = require('express');
const adminRouter = require('./admin_router.js');
const organizationRouter = require('./organization_router.js');

const router = express.Router();

router.use('/organization', organizationRouter);
router.use('/admin', adminRouter);

module.exports = router;