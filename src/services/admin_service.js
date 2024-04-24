const adminRepository = require('../repositories/admin_repository.js');

class AdminService{
    // async login({ name, password }){
    //     try {
    //         const user = await adminRepository.login({ name, password });

    //         return user;
    //     } catch (exception) {
    //         throw exception;
    //     }
    // }
}

const adminService = new AdminService();

module.exports = adminService