const adminRepository = require('../repositories/admin_repository.js');

// class AdminService{
//     async login({ name, password }){
//         try {
//             const user = await adminRepository.login({ name, password });

//             return user;
//         } catch (exception) {
//             throw exception;
//         }
//     }
// }

class AdminService {
  async getAdmins() {
    try {
      return await adminRepository.getAdmins();
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:getAdmins");
    }
  }

  async getAdminById(adminId) {
    try {
      const admin = await adminRepository.getAdminById(adminId);

      return admin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:getAdminById");
    }
  }

  async createAdmin(name, cpf, email, telephone, birthDate, password, organizationId) {
    try {
      const createdAdmin = await adminRepository.createAdmin(name, cpf, email, telephone, birthDate, password, organizationId);

      return createdAdmin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:createAdmin");
    }
  }

  async updateAdmin(adminId, name, email, telephone, birthDate, password) {
    try {
      const adminToUpdate = await adminRepository.getAdminById(adminId);

      if (!adminToUpdate) {
        throw console.log("Admin not found"); //NotFoundException
      }

      const updatedAdmin = await adminRepository.updateAdmin(adminId, name, email, telephone, birthDate, password);

      return updatedAdmin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:updateAdmin");
    }
  }

  async deleteAdmin(adminId) {
    try {
      const adminToDelete = await adminRepository.getAdminById(adminId);

      if (!adminToDelete) {
        throw console.log("Admin not found"); //NotFoundException
      }

      const deletedAdmin = await adminRepository.deleteAdmin(adminId);

      return deletedAdmin;
    } catch (exceptino) {
      console.log(exceptino);
      console.log("AdminService:deleteAdmin");
    }
  }
}
const adminService = new AdminService();

module.exports = adminService;