const organizationService = require('../services/OrganizationService.js');
const HttpResponse = require('../utils/HttpResponse.js');

class OrganizationController {
  async getOrganizations (req, res) {
    try {
      const organizations = await organizationService.getOrganizations();

      const response = new HttpResponse({
        statusCode: 200,
        data: organizations
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getOrganizationById (req, res) {
    try {
      const organizationId = req.params.id;

      const organization = await organizationService.getOrganizationById(organizationId);
      
      const response = new HttpResponse({
        statusCode: 200,
        data: organization
      });
      
      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createOrganization (req, res) {
    try {
      const name = req.body.name;
      const cnpj = req.body.cnpj;
      const email = req.body.email;
      const telephone = req.body.telephone;
      const zipcode = req.body.zipcode;
      const street = req.body.street;
      const number = req.body.number;
      const city = req.body.city;
      const state = req.body.state;
      const expireDate = req.body.expireDate;
     
      const createdOrganization = await organizationService.createOrganization(name, cnpj, email, telephone, zipcode, street, number, city, state, expireDate);
      
      const response = new HttpResponse({
        statusCode: 200,
        data: createdOrganization
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateOrganization (req, res) {
    try {
      const organizationId = req.params.id;
      
      const name = req.body.name;
      const email = req.body.email;
      const telephone = req.body.telephone;
      const zipcode = req.body.zipcode;
      const street = req.body.street;
      const number = req.body.number;
      const city = req.body.city;
      const state = req.body.state;
      const expireDate = req.body.expireDate;
      
      const updatedOrganization = await organizationService.updateOrganization(organizationId, name, email, telephone, zipcode, street, number, city, state, expireDate);

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedOrganization,
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteOrganization (req, res) {
    try {
      const organizationId = req.params.id;

      const deletedOrganization = await organizationService.deleteOrganization(organizationId);

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedOrganization,
        message: "Organization deleted!"
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}

const organizationController = new OrganizationController();

module.exports = organizationController;