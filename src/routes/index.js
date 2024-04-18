const express = require('express');
const router = express.Router();
const categoryRoutes = require('./category_routes.js'); 

router.use('/categories', categoryRoutes);

module.exports = router;