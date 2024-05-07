const jwt = require('jsonwebtoken');
const { UnauthorizedException, ForbiddenException, HttpResponse } = require('../utils');
require('dotenv').config();

class AuthMiddleware {
  constructor() {
    this.secretKey = process.env.SECRET_KEY;
  }

  isLoged(req, res, next) {
    try {
      const sessionToken = req.cookies.session_id;

      if (!sessionToken) {
        throw new UnauthorizedException('Unauthorized access, you must login before.');
      }

      jwt.verify(sessionToken, this.secretKey, (err, decoded) => {
        if (err) {
          throw new UnauthorizedException('Invalid JTW token.');
        }
        req.session = decoded.session;
        next();
      });
    } catch (exceptino) {
      const response = HttpResponse.fromException(exceptino);
      return res.status(response.statusCode).json(response);
    }
  }

  isAdmin(req, res, next) {
    try {
      const session = req.session;
      if (!session || !session.user_type || session.user_type !== "admin") {
        throw new ForbiddenException('Invalid permission');
      }

      next();
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      return res.status(response.statusCode).json(response);
    }
  }

  isTable(req, res, next) {
    try {
      const session = req.session;
      if (!session || !session.user_type || session.user_type !== "mesa") {
        throw new ForbiddenException('Invalid permission');
      }

      next();
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      return res.status(response.statusCode).json(response);
    }
  }

  isKitchen(req, res, next) {
    try {
      const session = req.session;
      if (!session || !session.user_type || session.user_type !== "cozinha") {
        throw new ForbiddenException('Invalid permission');
      }

      next();
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      return res.status(response.statusCode).json(response);
    }
  }

  isBalcony(req, res, next) {
    try {
      const session = req.session;
      if (!session || !session.user_type || session.user_type !== "balcao") {
        throw new ForbiddenException('Invalid permission');
      }

      next();
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      return res.status(response.statusCode).json(response);
    }
  }
}

const authMiddleware = new AuthMiddleware();

module.exports = authMiddleware;