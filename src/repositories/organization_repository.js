const database = require('../database/database.js');
const Organization = require('../model/Organization_model.js');

class OrganizationRepository {
  async getOrganizations() {
    try {
      const result = await database.executeQuery({
        query: "SELECT * FROM organization"
      });

      const organizations = result.map((result) => {
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

    } catch (exception) {
      console.log(exception);
      console.log("OrganizationRepository:getOrganizations");
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
      console.log(exception);
      console.log("OrganizationRepository:getOrganizationById");
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

      return createdOrganization;
    } catch (exception) {
      console.log(exception);
      console.log("OrganizationRepository:createOrganization");
    }
  }

  async updateOrganization(organizationId, name, email, telephone, zipcode, street, number, city, state, expireDate) {
    try {
      const result = await database.executeQuery({
        query:
        `UPDATE organization SET name = $2, email = $3, telephone = $4, zipcode = $5, street = $6, 
          number = $7, city = $8, state = $9, expire_date = $10 WHERE id = $1 RETURNING *`,
        args: [organizationId, name, email, telephone, zipcode, street, number, city, state, expireDate]
      });
      
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
      
      return updatedOrganization;
    } catch (exception) {
      console.log(exception);
      console.log("OrganizationRepository:updateOrganization");
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
      console.log("OrganizationRepository:deleteOrganization");
    }
  }
}

const organizationRepository = new OrganizationRepository();

module.exports = organizationRepository;