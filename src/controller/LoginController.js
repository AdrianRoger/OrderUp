const { config } = require('dotenv');
const passwordUtils = require('../utils/PasswordUtils');
const jwt = require('jsonwebtoken');
const HttpResponse = require('../utils/HttpResponse');
const {
  UnauthorizedException,
  BadRequestException,
  InternalServerException,
  PaymentRequiredException } = require('../utils/Exception');
const adminService = require('../services/AdminService.js');
const organizationService = require('../services/OrganizationService.js');
const deviceService = require('../services/DeviceService.js');

class LoginController {
  constructor() {
    config()
    this.secretKey = process.env.SECRET_KEY;
  }

  async authentication(req, res) {
    try {
      const type = String(req.body.type);

      if (!type) {
        throw new BadRequestException('Login type must be informed.');
      }

      if (type !== 'admin' && type !== 'device') {
        throw new BadRequestException('Login type must be informed.');
      }

      let session;
      let response;
      let sessionToken;

      switch (type) {
        case 'admin':
          const email = String(req.body.username);
          const password = String(req.body.password);

          if (!email || !password) {
            throw new BadRequestException('Invalid email or password.');
          }

          //rota getAdminByEmail inexistente
          const adminFound = await adminService.getAdminByEmail({ email });
          if (!foundUser) {
            res.cookie('session_id', '', { expires: new Date(0) });
            throw new UnauthorizedException(error);
          }

          const match = await passwordUtils.comparePassword(password, adminFound.password);
          if (!match) {
            res.cookie('session_id', '', { expires: new Date(0) });
            throw new UnauthorizedException(error);
          }

          const org = await organizationService.getOrganizationById({ id: adminFound.organizationId });
          if (org.expireDate < Date.now()) {
            res.cookie('session_id', '', { expires: new Date(0) });
            throw new PaymentRequiredException(error);
          }

          session = {
            organization_id: adminFound.organizationId,
            username: adminFound.email,
            user_type: 'admin',
            device_type: '',
          }

          response = new HttpResponse({
            statusCode: 200,
            data: session,
          });

          sessionToken = await jwt.sign({ session }, this.secretKey);

          res.cookie('session_id', sessionToken, { maxAge: 30 * 60 * 1000, httpOnly: true });
          res.status(response.statusCode).json(response);

          break;

        case 'device':
          const orgLoginName = String(req.body.username);
          const hashcode = String(req.body.password);

          if (!orgLoginName || hashcode.length !== 10) {
            throw new BadRequestException('Invalid email or password.');
          }

          //metodo getOrganizationByLoginName inexistente
          const organizationFound = await organizationService.getOrganizationByLoginName({ loginName: orgLoginName });
          if (!organizationFound) {
            res.cookie('session_id', '', { expires: new Date(0) });
            throw new UnauthorizedException(error);
          }

          const devices = await deviceService.getDeviceByOrganizationId({ id: organizationFound.id });
          const device = devices.find(dev => dev.hashcode === hashcode);
          if (device === undefined) {
            res.cookie('session_id', '', { expires: new Date(0) });
            throw new UnauthorizedException(error);
          }

          const orgDevice = await organizationService.getOrganizationById({ id: device.organizationId });
          if (orgDevice.expireDate < Date.now()) {
            res.cookie('session_id', '', { expires: new Date(0) });
            throw new PaymentRequiredException(error);
          }

          session = {
            organization_id: organizationFound.id,
            username: organizationFound.loginName,
            user_type: 'device',
            device_type: device.type,
            device_name: device.name,
          }

          response = new HttpResponse({
            statusCode: 200,
            data: session,
          });

          sessionToken = await jwt.sign({ user }, this.secretKey);

          res.cookie('session_id', sessionToken, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true });
          res.status(response.statusCode).json(response);

          break;
        default:
          console.log('Error: Something Wrong isn\'t ok.');
          throw new InternalServerException(error);
      }

    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
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