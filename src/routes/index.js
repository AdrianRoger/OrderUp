const express = require('express');
const adminRouter = require('./admin_router.js');

const router = express.Router();

router.use('/user', adminRouter);

module.exports = {
    router
}