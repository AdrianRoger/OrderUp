const jwt = require('jsonwebtoken');
const {
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  PaymentRequiredException,
  passwordUtils } = require('../utils');
const {
  organizationRepository,
  adminRepository,
  deviceRepository } = require('../repositories');
require('dotenv').config();

class AuthMiddleware {
  constructor() {
    this.secretKey = process.env.SECRET_KEY;
  }

  async authenticate(req, res, next) {
    try {
      const type = String(req.body.type);

      let session;
      let error = 'Invalid email or password.';

      if (!type) {
        throw new BadRequestException('Login type must be informed.');
      }

      if (type !== 'admin' && type !== 'device') {
        throw new BadRequestException('Login type must be informed.');
      }

      //Admin Authenticate
      if (type === 'admin') {
        const email = String(req.body.username);
        const password = String(req.body.password);

        if (!email || !password) {
          throw new BadRequestException(error);
        }

        const adminFound = await adminRepository.getAdminByEmail({ email });
        if (!adminFound) {
          throw new UnauthorizedException(error);
        }

        const match = await passwordUtils.comparePassword(password, adminFound.password);
        if (!match) {
          throw new UnauthorizedException(error);
        }

        const org = await organizationRepository.getOrganizationById({ id: adminFound.organizationId });
        if (org.expireDate < Date.now()) {
          throw new PaymentRequiredException('License expired, contact your administrator.');
        }

        session = {
          organization_id: adminFound.organizationId,
          user_id: adminFound.id,
          username: adminFound.email,
          user_type: 'admin',
          device_type: '',
        }
      
        const response = {
          statusCode: 200,
          data: session,
          error: null,
          message: 'Autenticação realizada com sucesso.',
        };

        req.body.sessionToken = await jwt.sign({ session }, this.secretKey);
        req.body.response = {...response};

        next();
      }

      //Device authenticate
      if (type === 'device') {
        const orgLoginName = String(req.body.username);
        const hashcode = String(req.body.password);

        error = 'Invalid organization or hashcode.';
        if (!orgLoginName || hashcode.length !== 10) {
          throw new BadRequestException(error);
        }

        //Search organization
        const organizationFound = await organizationRepository.getOrganizationByLoginName({ loginName: orgLoginName });
        if (!organizationFound) {
          throw new UnauthorizedException(error);
        }

        //Search device to log in
        const devices = await deviceRepository.getDeviceByOrganizationId({ organizationId: organizationFound.id });
        const device = devices.find(dev => dev.hashcode === hashcode);
        if (device === undefined) {
          throw new UnauthorizedException(error);
        }

        //Check License
        const orgDevice = await organizationRepository.getOrganizationById({ id: device.organizationId });
        if (orgDevice.expireDate < Date.now()) {
          throw new PaymentRequiredException('License expired, contact your administrator.');
        }

        session = {
          organization_id: organizationFound.id,
          username: organizationFound.loginName,
          user_type: 'device',
          device_type: device.type,
          device_id: device.id,
          device_name: device.name,
        }

        const response = {
          statusCode: 200,
          data: session,
          error: null,
          message: 'Autenticação realizada com sucesso.',
        };

        req.body.sessionToken = await jwt.sign({ session }, this.secretKey);
        req.body.response = {...response};

        next();
      }

    } catch (exception) {
      if(exception instanceof BadRequestException){
        const response = {
          statusCode: 400,
          data: null,
          error: exception.constructor.name,
          message: 'Dados de login inválidos.',
        };

        req.body.sessionToken = '';
        req.body.response = {...response};

        next();
      }

      if(exception instanceof PaymentRequiredException){
        const response = {
          statusCode: 402,
          data: null,
          error: exception.constructor.name,
          message: 'Licensa expirada, contate o administrador.',
        };

        req.body.sessionToken = '';
        req.body.response = {...response};

        next();
      }

      if(exception instanceof UnauthorizedException){
        const response = {
          statusCode: 401,
          data: null,
          message: 'Dados de login inválidos.',
          error: exception.constructor.name
        };

        req.body.sessionToken = '';
        req.body.response = {...response};

        
        next();
      }
    }
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
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
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
    } catch (exception) {
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
    } catch (exception) {
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
    } catch (exception) {
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
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      return res.status(response.statusCode).json(response);
    }
  }
}

const authMiddleware = new AuthMiddleware();

module.exports = authMiddleware;