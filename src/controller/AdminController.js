const adminService = require('../services/AdminService.js');
const { HttpResponse, BadRequestException, ValidateUuidV4 } = require('../utils');

class AdminController {
  async getAdmins(req, res) {
    try {
      const admins = await adminService.getAdmins();

      const response = new HttpResponse({
        statusCode: 200,
        data: admins
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getAdminByEmail(req, res) {
    try {
      const email = req.params.email;
      if (!email) {
        throw new BadRequestException('Invalid parameter for email');
      }

      const admin = await adminService.getAdminByEmail({ email });

      const response = new HttpResponse({
        statusCode: 200,
        data: admin
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getAdminById(req, res) {
    try {
      const id = req.params.id;

      if (!ValidateUuidV4.isValidUuidV4({ uuid: id })) {
        throw new BadRequestException('The parameter ID is not a valid uuid');
      }

      const admin = await adminService.getAdminById({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: admin
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createAdmin(req, res) {
    try {
      const name = req.body.name;
      const cpf = req.body.cpf;
      const email = req.body.email;
      const telephone = req.body.telephone;
      const birthDate = req.body.birthDate;
      const password = req.body.password;
      const organizationId = req.body.organizationId;

      const createdAdmin = await adminService.createAdmin({ name, cpf, email, telephone, birthDate, password, organizationId });

      const response = new HttpResponse({
        statusCode: 200,
        data: createdAdmin
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateAdmin(req, res) {
    try {
      const id = req.params.id;

      if (!ValidateUuidV4.isValidUuidV4({ uuid: id })) {
        throw new BadRequestException('The parameter ID is not a valid uuid');
      }

      const name = req.body.name;
      const email = req.body.email;
      const telephone = req.body.telephone;
      const birthDate = req.body.birthDate;

      const updatedAdmin = await adminService.updateAdmin({ id, name, email, telephone, birthDate });

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedAdmin
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateAdminPassword(req, res){
    try{
      const id = req.params.id;

      if (!ValidateUuidV4.isValidUuidV4({ uuid: id })) {
        throw new BadRequestException('The parameter ID is not a valid uuid');
      }

      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      //precisa ter no body para a atualização, mas será validade pela joi
      //const confirmPassword = req.body.machPassword; 

      const updated = await adminService.updateAdminPassword({id, oldPassword, password: newPassword});

      const response = new HttpResponse({
        statusCode: 200,
        message: updated.message
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteAdmin(req, res) {
    try {
      const id = req.params.id;

      if (!ValidateUuidV4.isValidUuidV4({ uuid: id })) {
        throw new BadRequestException('The parameter ID is not a valid uuid');
      }

      const deletedAdmin = await adminService.deleteAdmin({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedAdmin,
        message: "Admin deleted!"
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}
const adminController = new AdminController();

module.exports = adminController;