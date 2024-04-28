const express = require('express');
const organizationController = require('../controller/OrganizationController');

const organizationRouter = express.Router();

organizationRouter.get('/', organizationController.getOrganizations);
organizationRouter.get('/loginName/:loginName', organizationController.getOrganizationByLoginName);
organizationRouter.get('/:id', organizationController.getOrganizationById);
organizationRouter.post('/', organizationController.createOrganization);
organizationRouter.put('/:id', organizationController.updateOrganization);
organizationRouter.delete('/:id', organizationController.deleteOrganization);

module.exports = organizationRouter;