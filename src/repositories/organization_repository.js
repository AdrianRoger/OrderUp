const database = require('../database/database.js');
const Organization = require('../model/Organization_model.js');

class OrganizationRepository {
  async getOrganizations() {
    try {
      const results = await database.executeQuery({
        query: `SELECT * FROM organization`
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
          state: result,state,
          expireDate: result.expireDate
        });
      });

      return organizations ?? [];

    } catch (error) {
      console.log("erro aqui");
    }
  }

  async getOrganizationsById(id) {
    try {
      const results = await database.executeQuery({
        query: `SELECT * FROM organization WHERE id = $1`,
        args: [id]
      });

      if (results <= 0) {
        throw new exception("")
      }
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
          state: result,state,
          expireDate: result.expireDate
        });
      });

      return organizations ?? [];

    } catch (exception) {
      console.log("erro aqui");
    }
  }

  async createOrganization() {
    try {

    } catch (exception) {

    }
  }

  async updateOrganization() {
    try {

    } catch (exception) {

    }
  }

  async deleteOrganization() {
    try {

    } catch (exception) {

    }
  }

}

module.exports = OrganizationRepository;