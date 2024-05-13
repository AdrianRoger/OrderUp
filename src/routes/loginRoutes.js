const express = require('express');
const loginController = require('../controller/LoginController');
const { authMiddleware } = require('../middlewares')

const loginRouter = express.Router();

loginRouter.post('/', authMiddleware.authenticate.bind(authMiddleware), loginController.authentication.bind(loginController));
loginRouter.get('/exit', loginController.logOut);

module.exports = loginRouter;