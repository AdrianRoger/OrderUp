const database = require('../database/database.js');
const Admin = require('../model/AdminModel.js');

// class AdminRepository{
//   async login({ name, password }) { //trocar name para email
//     try {
//       const results = await database.excuteQuery({
//           query: 'SELECT * FROM admin WHERE name = $1',
//           args: [name]
//       })

//       if(results.length === 0){
//           throw new Error('Username not found!')
//       }

//       const storedPassword = results[0].password;
//       if(password !== storedPassword){
//           throw new Error('Incorrect password!');
//       }

//       console.log('Successful login!');
//       return results;
//     } catch (error) {
//         console.error('Error during login:', error);
//         throw error;
//     }
//   }
// }

class AdminRepository {
  async getAdmins() {
    try {
      const result = await database.executeQuery({
        query: "SELECT * FROM admin"
      });

      const admins = result.map((result) => {
        return new Admin({
          id: result.id,
          name: result.name,
          cpf: result.cpf,
          email: result.email,
          telephone: result.telephone,
          birthDate: result.birth_date,
          password: result.password,
          type: result.type,
          organizationId: result.fk_organization_id
        });
      });

      return admins ?? [];

    } catch (exception) {
      console.log(exception);
      console.log("AdminRepository:getAdmins");
    }
  }

  async getAdminById(adminId) {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM admin WHERE id = $1`,
        args: [adminId]
      });

      if (result.lenght === 0) {
        return null;
      }

      const admin = new Admin({
        id: result[0].id,
        name: result[0].name,
        cpf: result[0].cpf,
        email: result[0].email,
        telephone: result[0].telephone,
        birthDate: result[0].birth_date,
        password: result[0].password,
        type: result[0].type,
        organizationId: result[0].fk_organization_id
      });

      return admin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminRepository:getAdminById");
    }
  }

  async createAdmin(name, cpf, email, telephone, birthDate, password, organizationId) {
    try {
      const result = await database.executeQuery({
        query: 
        `INSERT INTO admin (name, cpf, email, telephone, birth_date, password, fk_organization_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        args: [name, cpf, email, telephone, birthDate, password, organizationId]
      });

      const createdAdmin = new Admin({
        id: result[0].id,
        name: result[0].name,
        cpf: result[0].cpf,
        email: result[0].email,
        telephone: result[0].telephone,
        birthDate: result[0].birth_date,
        password: result[0].password,
        type: result[0].type,
        organizationId: result[0].fk_organization_id
      });

      return createdAdmin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminRepository:createAdmin");
    }
  }

  async updateAdmin(adminId, name, email, telephone, birthDate, password) {
    try {
      const result = await database.executeQuery({
        query:
        `UPDATE admin SET name = $2, email = $3, telephone = $4, birth_date = $5, 
          password = $6 WHERE id = $1 RETURNING *`,
        args: [adminId, name, email, telephone, birthDate, password]
      });

      const updatedAdmin = new Admin({
        id: result[0].id,
        name: result[0].name,
        cpf: result[0].cpf,
        email: result[0].email,
        telephone: result[0].telephone,
        birthDate: result[0].birth_date,
        password: result[0].password,
        type: result[0].type,
        organizationId: result[0].fk_organization_id
      });

      return updatedAdmin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminRepository:updateAdmin");
    }
  }

  async deleteAdmin(adminId) {
    try {
      const result = await database.executeQuery({
        query: `DELETE FROM admin WHERE id = $1 RETURNING *`,
        args: [adminId]
      });

      const deletedAdmin = new Admin({
        id: result[0].id,
        name: result[0].name,
        cpf: result[0].cpf,
        email: result[0].email,
        telephone: result[0].telephone,
        birthDate: result[0].birth_date,
        password: result[0].password,
        type: result[0].type,
        organizationId: result[0].fk_organization_id
      });

      return deletedAdmin;
    } catch (exception) {
      console.log(exception);
      console.log("AdminRepository:deleteAdmin");
    }
  }
}

const adminRepository = new AdminRepository();

module.exports = adminRepository;