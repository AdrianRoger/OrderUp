const database = require('../database/database.js');
const Organization = require('../model/organization_model');

class OrganizationRepository {
  async getOrganizations() {
    try {
      const results = await database.excuteQuery({
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
}

module.exports = OrganizationRepository;