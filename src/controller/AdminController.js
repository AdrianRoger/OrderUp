const adminService = require('../services/AdminService.js');
const { HttpResponse, passwordUtils } = require('../utils');

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
      const adminEmail = req.params.email;

      const admin = await adminService.getAdminByEmail(adminEmail);

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
      const adminId = req.params.id;

      const admin = await adminService.getAdminById({ id: adminId });

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

      const hashedPassword = await passwordUtils.hashPassword(password);

      const createdAdmin = await adminService.createAdmin({ name, cpf, email, telephone, birthDate, password: hashedPassword, organizationId });

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
      const adminId = req.params.id;

      const name = req.body.name;
      const email = req.body.email;
      const telephone = req.body.telephone;
      const birthDate = req.body.birthDate;
      const password = req.body.password;

      const hashedPassword = await passwordUtils.hashedPassword(password)

      const updatedAdmin = await adminService.updateAdmin({ id: adminId, name, email, telephone, birthDate, password: hashedPassword });

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

  async deleteAdmin(req, res) {
    try {
      const adminId = req.params.id;

      const deletedAdmin = await adminService.deleteAdmin({ id: adminId });

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