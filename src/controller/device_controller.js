const deviceService = require('../services/device_service.js');
const { BadRequestException } = require('../utils/exception.js');
const httpResponse = require('../utils/HttpResponse.js');

class DeviceController{
    async list(req, res){
        try {
            const devices = await deviceService.list();

            const response = await new httpResponse({
                statusCode: 200,
                data: devices
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async getDeviceById(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new BadRequestException('Device ID must be a non-empty string');
            }

            const device = await deviceService.getDeviceById(id);

            const response = await new httpResponse({
                statusCode: 200,
                data: device
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            const response = await httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async getDeviceToOrganizationId(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new BadRequestException('Organization ID must be valid');
            }

            const device = await deviceService.getDeviceByOrganizationId(id);

            const response = await new httpResponse({
                statusCode: 200,
                data: device
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            console.error(exception);
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async create(req, res){
        try {
            const type = String(req.body.type ?? '');
            const name = String(req.body.name ?? '');
            const hashcode = String(req.body.hashcode ?? '');
            const organizationId = String(req.body.organizationId ?? '');

            if(organizationId.length === 0 || name.length === 0 || hashcode.length === 0 || type.length === 0){
                console.log(name);
                throw new BadRequestException('Organization ID or Device NAME, HASHCODE must be a non-empty string');
            }
    
            const createDevice = await deviceService.create({ type, name, hashcode, organizationId });
    
            const response = await new httpResponse({
                statusCode: 201,
                data: createDevice
            });

            res.status(response.statusCode).json(response.data);  
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async update(req, res){
        try {
            const type = String(req.body.type ?? '');
            const name = String(req.body.name ?? '');
            const organizationId = String(req.body.organizationId ?? '');
            const id = String(req.params.id ?? '');

            if(type.length === 0 || name.length === 0 || organizationId.length === 0){
                throw new BadRequestException('Device Type, Name or OrganizationId must be a non-empty String!');
            }

            const updatedDevice = await deviceService.update({ type, name, organizationId, id });

            const response = await new httpResponse({
                statusCode: 200,
                data: updatedDevice
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            console.log(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async delete(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new BadRequestException('Device closed must be a non-empty String!');
            }

            const deletedDevice = await deviceService.delete(id);

            const response = await new httpResponse({
                statusCode: 200,
                data: deletedDevice
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }
}

const deviceController = new DeviceController();

module.exports = deviceController;