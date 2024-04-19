const express = require('express');
const adminRouter = require('./admin_router.js');
const dinningTableRouter = require('./dinningTable_router.js');
const deviceRouter = require('./device_router.js');

const router = express.Router();

router.use('/user', adminRouter);
router.use('/dinningTable', dinningTableRouter);
router.use('/device', deviceRouter);

module.exports = {
    router
}