const adminRepository = require('../repositories/AdminRepository.js');
class AdminService {
  async getAdmins() {
    try {
      return await adminRepository.getAdmins();
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:getAdmins");
    }
  }

  async getAdminByEmail({ email }) {
    try {
      const admin = await adminRepository.getAdminByEmail({ email });

      return admin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:getAdminByEmail");
    }
  }

  async getAdminById({ id }) {
    try {
      const admin = await adminRepository.getAdminById({ id });

      return admin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:getAdminById");
    }
  }

  async createAdmin({ name, cpf, email, telephone, birthDate, password, organizationId }) {
    try {
      const createdAdmin = await adminRepository.createAdmin({ name, cpf, email, telephone, birthDate, password, organizationId });

      return createdAdmin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:createAdmin");
    }
  }

  async updateAdmin({ id, name, email, telephone, birthDate, password }) {
    try {
      const adminToUpdate = await adminRepository.getAdminById(adminId);

      if (!adminToUpdate) {
        throw console.log("Admin not found"); //NotFoundException
      }

      const updatedAdmin = await adminRepository.updateAdmin({ id, name, email, telephone, birthDate, password });

      return updatedAdmin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminService:updateAdmin");
    }
  }

  async deleteAdmin({ id }) {
    try {
      const adminToDelete = await adminRepository.getAminById({ id });

      if (!adminToDelete) {
        throw console.log("Admin not found"); //NotFoundException
      }

      const deletedAdmin = await adminRepository.deleteAdmin({ id });

      return deletedAdmin;
    } catch (exceptino) {
      console.log(exceptino);
      console.log("AdminService:deleteAdmin");
    }
  }
}
const adminService = new AdminService();

module.exports = adminService;