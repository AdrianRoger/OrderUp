const adminService = require('../services/admin_service.js');
const HttpResponse = require('../utils/HttpResponse.js');

// class AdminController{
//     async login(req, res){
//         try {
//             const name = String(req.body.name ?? '');
//             const password = String(req.body.password ?? '');
//             if(name.length === 0 || password.length === 0){
//                 console.log("entrou");
//                 throw new Error('The username and password must be a non-empty string');
//             }

//             const loginUser = await adminService.login({ name, password });

//             const token = jwt.sign({ userId: loginUser[0].id }, process.env.SECRET, {expiresIn: '1d'});

//             res.status(200).json({ "auth":true, "token":token });
//         } catch (exception) {
//             console.error(exception);
//             res.status(500).json({"auth":false, "error":exception});
//         }
//     }
// }
class AdminController {
  async getAdmins (req, res) {
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

  async getAdminById (req, res) {
    try {
      const adminId = req.params.id;

      const admin = await adminService.getAdminById(adminId);

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

  async createAdmin (req, res) {
    try {
      const name = req.body.name;
      const cpf = req.body.cpf;
      const email = req.body.email;
      const telephone = req.body.telephone;
      const birthDate = req.body.birthDate;
      const password = req.body.password;
      const organizationId = req.body.organizationId;

      const createdAdmin = await adminService.createAdmin(name, cpf, email, telephone, birthDate, password, organizationId);
      
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

  async updateAdmin (req, res) {
    try {
      const adminId = req.params.id;

      const name = req.body.name;
      const email = req.body.email;
      const telephone = req.body.telephone;
      const birthDate = req.body.birthDate;
      const password = req.body.password;

      const updatedAdmin = await adminService.updateAdmin(adminId, name, email, telephone, birthDate, password);

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

  async deleteAdmin (req, res) {
    try {
      const adminId = req.params.id;

      const deletedAdmin = await adminService.deleteAdmin(adminId);

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