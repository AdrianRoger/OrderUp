const express = require('express');
const adminRouter = require('./admin_router.js');
const dinningTableRouter = require('./DinningTableRouter.js');
const deviceRouter = require('./DeviceRouter.js');
const organizationRouter = require('./organization_router.js');

const router = express.Router();

router.use('/user', adminRouter);
router.use('/dinningTable', dinningTableRouter);
router.use('/device', deviceRouter);
router.use('/organization', organizationRouter);
router.use('/admin', adminRouter);

module.exports = router;