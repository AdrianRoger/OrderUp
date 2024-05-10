const database = require('../database/Database.js');
const Admin = require('../model/AdminModel.js');
const { InternalServerException, NotFoundException } = require('../utils');
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
          organizationId: result.fk_organization_id
        });
      });

      return admins ?? [];

    } catch (error) {
      console.error(`AdminRepository:getAdmins error: [${error}]`);
      throw new InternalServerException();
    }
  }

  async getAdminByEmail({ email }) {
    try {
      const result = await database.executeQuery({
        query: "SELECT * FROM admin WHERE email = $1",
        args: [email]
      });

      if (result.length === 0) {
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
        organizationId: result[0].fk_organization_id
      });

      return admin;

    } catch (error) {
      console.error(`AdminRepository:getAdminByEmail error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getAdminById({ id }) {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM admin WHERE id = $1`,
        args: [id]
      });

      if (result.length === 0) {
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
        organizationId: result[0].fk_organization_id
      });

      return admin;
    } catch (error) {
      console.error(`AdminRepository:getAdminById error [${error}]`);
      throw new InternalServerException();
    }
  }

  async createAdmin({ name, cpf, email, telephone, birthDate, password, organizationId }) {
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
        organizationId: result[0].fk_organization_id
      });

      return createdAdmin;

    } catch (error) {
      console.error(`AdminRepository:createAdmin error [${error}]`);
      throw new InternalServerException();
    }
  }

  async updateAdmin({ id, name, email, telephone, birthDate }) {
    try {
      const result = await database.executeQuery({
        query:
          `UPDATE admin SET name = $2, email = $3, telephone = $4, birth_date = $5 
           WHERE id = $1 RETURNING *`,
        args: [id, name, email, telephone, birthDate]
      });

      const updatedAdmin = new Admin({
        id: result[0].id,
        name: result[0].name,
        cpf: result[0].cpf,
        email: result[0].email,
        telephone: result[0].telephone,
        birthDate: result[0].birth_date,
        organizationId: result[0].fk_organization_id
      });

      return updatedAdmin;
    } catch (error) {
      console.error(`AdminRepository:updateAdmin error [${error}]`);
      throw new InternalServerException();
    }
  }

  async updateAdminPassword({ id, password }) {
    try{
      const result = await database.executeQuery({
        query: `UPDATE admin SET password = $2 WHERE id = $1 RETURNING *`,
        args: [id, password]
      });

      const updated = {
        message: `Password for admin ${result[0].name} updated.`
      }

      return updated;
    }catch(error){
      console.error(`AdminRepository:updateAdminPassword error [${error}]`);
      throw new InternalServerException();
    }
  }

  async deleteAdmin({ id }) {
    try {
      const result = await database.executeQuery({
        query: `DELETE FROM admin WHERE id = $1 RETURNING *`,
        args: [id]
      });

      const deletedAdmin = new Admin({
        id: result[0].id,
        name: result[0].name,
        cpf: result[0].cpf,
        email: result[0].email,
        telephone: result[0].telephone,
        birthDate: result[0].birth_date,
        organizationId: result[0].fk_organization_id
      });

      return deletedAdmin;

    } catch (error) {
      console.error(`AdminRepository:deleteAdmin error [${error}]`);
      throw new InternalServerException();
    }
  }
}

const adminRepository = new AdminRepository();

module.exports = adminRepository;