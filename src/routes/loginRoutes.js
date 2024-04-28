const express = require('express');
const loginController = require('../controller/LoginController');

const loginRouter = express.Router();

loginRouter.post('/', loginController.authentication.bind(loginController));
loginRouter.get('/exit', loginController.logOut.bindf(loginController));

module.exports = loginRouter;