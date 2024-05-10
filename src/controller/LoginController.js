const { config } = require('dotenv');
const {
  passwordUtils,
  HttpResponse,
  InternalServerException } = require('../utils');

class LoginController {
  constructor() {
    config()
    this.secretKey = process.env.SECRET_KEY;
  }

  async authentication(req, res) {
    try {
      const type = String(req.body.type);

      const { response, sessionToken } = req.body;

      if (response.error) {
        const loginError = new Error(response.message);
        loginError.name = response.error;
        loginError.status = response.statusCode;
        //loginError = { name, status, message }
        throw loginError;
      }

      switch (type) {
        case 'admin':
          res.cookie('session_id', sessionToken, { maxAge: 30 * 60 * 1000, httpOnly: true });
          res.status(response.statusCode).json(response);
          break;

        case 'device':
          res.cookie('session_id', sessionToken, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true });
          res.status(response.statusCode).json(response);

          break;
        default:
          console.log('Error: Something Wrong isn\'t ok.');
          throw new InternalServerException(error);
      }

    } catch (exception) {
      if (exception instanceof InternalServerException) {
        const response = new HttpResponse.fromException(exception);
        return res.status(response.statusCode).json(response);
      }
      //{ name, status, message }
      
      const response = {
        name: exception.name,
        status: exception.status,
        message: exception.message
      }
      
      res.cookie('session_id', '', { expires: new Date(0) });
      res.status(response.status).json(response);
    }
  }

  async logOut(req, res) {
    res.cookie('session_id', '', { expires: new Date(0) });
    return res.status(200).json({ message: "Você saiu do sistema!" });
  }

  async getLogin(req, res) {
    const session = req.session;
    res.status(200).json(session);
  }
}

const loginController = new LoginController();
module.exports = loginController;