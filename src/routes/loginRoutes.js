const express = require('express');
const loginController = require('../controller/LoginController');

const loginRouter = express.Router();

loginRouter.post('/', loginController.authentication.bind(loginController));
loginRouter.get('/exit', loginController.logOut.bind(loginController));

module.exports = loginRouter;