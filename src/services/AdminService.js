const { adminRepository } = require('../repositories');
const { passwordUtils, NotFoundException, UnauthorizedException, BadRequestException } = require('../utils')

class AdminService {
  async getAdmins() {
    try {
      return await adminRepository.getAdmins();
    } catch (exception) {
      throw exception;
    }
  }

  async getAdminByEmail({ email }) {
    try {
      const admin = await adminRepository.getAdminByEmail({ email });

      if (!admin) {
        throw new NotFoundException('Admin not found.');
      }

      return admin;
    } catch (exception) {
      throw exception;
    }
  }

  async getAdminById({ id }) {
    try {
      const admin = await adminRepository.getAdminById({ id });

      if (!admin) {
        throw new NotFoundException('Admin not found.');
      }

      return admin;
    } catch (exception) {
      throw exception;
    }
  }

  async createAdmin({ name, cpf, email, telephone, birthDate, password, organizationId }) {
    try {

      const hashedPassword = await passwordUtils.hashPassword(password);

      const createdAdmin = await adminRepository.createAdmin({ name, cpf, email, telephone, birthDate, password: hashedPassword, organizationId });

      return createdAdmin;
    } catch (exception) {
      throw exception;
    }
  }

  async updateAdmin({ id, name, email, telephone, birthDate }) {
    try {
      const adminToUpdate = await adminRepository.getAdminById({ id });

      if (!adminToUpdate) {
        throw new NotFoundException('Admin not Found');
      }

      const updatedAdmin = await adminRepository.updateAdmin({ id, name, email, telephone, birthDate });

      return updatedAdmin;
    } catch (exception) {
      throw exception;
    }
  }

  async updateAdminPassword({ id, oldPassword, password }) {
    try {
      const adminToUpdate = await adminRepository.getAdminById({ id });

      if (!adminToUpdate) {
        throw new NotFoundException('Admin not Found');
      }

      const match = await passwordUtils.comparePassword(oldPassword, adminToUpdate.password);

      if (!match) {
        throw new BadRequestException('Invalid current password provided.');
      }

      const updated = await adminRepository.updateAdminPassword({ id, password });

      return updated;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteAdmin({ id }) {
    try {
      const adminToDelete = await adminRepository.getAminById({ id });

      if (!adminToDelete) {
        throw new NotFoundException("Admin not found");
      }

      const deletedAdmin = await adminRepository.deleteAdmin({ id });

      return deletedAdmin;
    } catch (exception) {
      throw exception;
    }
  }
}
const adminService = new AdminService();

module.exports = adminService;