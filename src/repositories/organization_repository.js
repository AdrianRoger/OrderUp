const database = require('../database/database.js');
const Organization = require('../model/Organization_model.js');

class OrganizationRepository {
  async getOrganizations() {
    try {
      const results = await database.executeQuery({
        query: "SELECT * FROM organization"
      });

      const organizations = results.map((result) => {
        return new Organization({
          id: result.id,
          name: result.name,
          cnpj: result.cnpj,
          email: result.email,
          telephone: result.telephone,
          zipcode: result.zipcode,
          street: result.street,
          number: result.number,
          city: result.city,
          state: result.state,
          expireDate: result.expire_date
        });
      });

      return organizations ?? [];

    } catch (error) {
      console.log("Erro get repository");
    }
  }

  async getOrganizationById(organizationId) {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM organization WHERE id = $1`,
        args: [organizationId]
      });

      if (result.lenght === 0) {
        return null;
      }

      const organization = new Organization({
          id: result[0].id,
          name: result[0].name,
          cnpj: result[0].cnpj,
          email: result[0].email,
          telephone: result[0].telephone,
          zipcode: result[0].zipcode,
          street: result[0].street,
          number: result[0].number,
          city: result[0].city,
          state: result[0].state,
          expireDate: result[0].expire_date
        });

      return organization;

    } catch (exception) {
      console.log("erro aqui");
    }
  }

  async createOrganization(name, cnpj, email, telephone, zipcode, street, number, city, state, expireDate) {
    try {
      const result = await database.executeQuery({
        query: 
          `INSERT INTO organization (name, cnpj, email, telephone, zipcode, street, number, city, state, expire_date) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        args: [name, cnpj, email, telephone, zipcode, street, number, city, state, expireDate]
      });

      const createdOrganization = new Organization({
        name: result[0].name,
        cnpj: result[0].cnpj,
        email: result[0].email,
        telephone: result[0].telephone,
        zipcode: result[0].zipcode,
        street: result[0].street,
        number: result[0].number,
        city: result[0].city,
        state: result[0].state,
        expireDate: result[0].expire_date
      });

      return createdOrganization;
    } catch (exception) {
      console.log("CreateOrganization error in organizationRepository.js", exception);
    }
  }

  async updateOrganization(organizationId, name, cnpj, email, telephone, zipcode, street, number, city, state, expireDate) {
    try {
      const result = await database.executeQuery({
        query:
        `UPDATE organization SET name = $2, cnpj = $3, email = $4, telephone = $5, zipcode = $6, street = $7, 
          number = $8, city = $9, state = $10, expire_date = $11 WHERE id = $1 RETURNING *`,
        args: [organizationId, name, cnpj, email, telephone, zipcode, street, number, city, state, expireDate]
      });
      console.log(result);
      const updatedOrganization = new Organization({
        id: result[0].id,
        name: result[0].name,
        cnpj: result[0].cnpj,
        email: result[0].email,
        telephone: result[0].telephone,
        zipcode: result[0].zipcode,
        street: result[0].street,
        number: result[0].number,
        city: result[0].city,
        state: result[0].state,
        expireDate: result[0].expire_date
      });
      console.log(updatedOrganization);
      return updatedOrganization;
    } catch (exception) {
      console.log(exception);
    }
  }

  async deleteOrganization(organizationId) {
    try {
      const result = await database.executeQuery({
        query: `DELETE FROM organization WHERE id = $1 RETURNING *`,
        args: [organizationId]
      });

      const deletedOrganization = new Organization({
        id: result[0].id,
        name: result[0].name,
        cnpj: result[0].cnpj,
        email: result[0].email,
        telephone: result[0].telephone,
        zipcode: result[0].zipcode,
        street: result[0].street,
        number: result[0].number,
        city: result[0].city,
        state: result[0].state,
        expireDate: result[0].expire_date
      });

      return deletedOrganization;
    } catch (exception) {
      console.log("erro aqui");
    }
  }
}

const organizationRepository = new OrganizationRepository();

module.exports = organizationRepository;