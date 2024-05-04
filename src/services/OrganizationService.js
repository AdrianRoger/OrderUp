const organizationRepository = require('../repositories/OrganizationRepository.js');

class OrganizationService {
  async getOrganizations() {
    try {
      return await organizationRepository.getOrganizations();
    } catch (exception) {
      throw exception;
    }
  }

  async getOrganizationByLoginName({ loginName }) {
    try {
      const organization = await organizationRepository.getOrganizationByLoginName({ loginName });

      return organization;

    } catch (exception) {
      throw exception;
    }
  }

  async getOrganizationById({ id }) {
    try {
      const organization = await organizationRepository.getOrganizationById({ id });

      return organization;

    } catch (exception) {
      throw exception;
    }
  }

  async createOrganization({ name, cnpj, email, telephone, zipcode, street, number, city, state, expireDate }) {
    try {
      const createdOrganization = await organizationRepository.createOrganization({ name, cnpj, email, telephone, zipcode, street, number, city, state, expireDate });

      return createdOrganization;
    } catch (exception) {
      throw console.log(exception);
    }
  }

  async updateOrganization({ organizationId, name, email, telephone, zipcode, street, number, city, state, expireDate }) {
    try {
      const organizationToUpdate = await organizationRepository.getOrganizationById({ organizationId });

      if (!organizationToUpdate) {
        throw console.log("Organization not found"); //NotFoundException("Recipe Not Found");
      }

      const updatedOrganization = await organizationRepository.updateOrganization({ organizationId, name, email, telephone, zipcode, street, number, city, state, expireDate });

      return updatedOrganization;
    } catch (exception) {
      throw console.log(exception);
    }
  }

  async deleteOrganization({ organizationId }) {
    try {
      const organizationToDelete = await organizationRepository.getOrganizationById({ organizationId });

      if (!organizationToDelete) {
        throw console.log("Organization not found"); //NotFoundException("Recipe Not Found");
      }

      const deletedOrganization = await organizationRepository.deleteOrganization({ organizationId });

      return deletedOrganization;
    } catch (exception) {
      throw exception;
    }
  }
}

const organizationService = new OrganizationService();

module.exports = organizationService;