const deviceService = require('../services/DeviceService.js');
const { BadRequestException, HttpResponse } = require('../utils');
const Crypto = require('crypto');

class DeviceController {
  async getDevices(req, res) {
    try {
      const devices = await deviceService.getDevices();

      const response = new HttpResponse({
        statusCode: 200,
        data: devices
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getDeviceById(req, res) {
    try {
      const id = String(req.params.id ?? '');

      if (id.length === 0) {
        throw new BadRequestException('Device ID must be a non-empty string');
      }

      const device = await deviceService.getDeviceById({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: device
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getDeviceByOrganizationId(req, res) {
    try {
      const id = String(req.params.id ?? '');

      if (id.length === 0) {
        throw new BadRequestException('Organization ID must be valid');
      }

      const device = await deviceService.getDeviceByOrganizationId({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: device
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      console.error(exception);
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createDevice(req, res) {
    try {
      const type = String(req.body.type ?? '');
      const name = String(req.body.name ?? '');
      const organizationId = String(req.body.organizationId ?? '');

      const hashcode = Crypto.randomBytes(5).toString('hex');

      if (organizationId.length === 0 || name.length === 0 || type.length === 0) {
        throw new BadRequestException('Organization ID and Device NAME must be a non-empty string');
      }

      const createDevice = await deviceService.createDevice({ type, name, hashcode, organizationId });

      const response = new HttpResponse({
        statusCode: 201,
        data: createDevice
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateDevice(req, res) {
    try {
      const type = String(req.body.type ?? '');
      const name = String(req.body.name ?? '');
      const organizationId = String(req.body.organizationId ?? '');
      const id = String(req.params.id ?? '');

      if (type.length === 0 || name.length === 0 || organizationId.length === 0) {
        throw new BadRequestException('Device Type, Name or OrganizationId must be a non-empty String!');
      }

      const updatedDevice = await deviceService.updateDevice({ type, name, organizationId, id });

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedDevice
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      console.log(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteDevice(req, res) {
    try {
      const id = String(req.params.id ?? '');

      if (id.length === 0) {
        throw new BadRequestException('Device closed must be a non-empty String!');
      }

      const deletedDevice = await deviceService.deleteDevice({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedDevice
      });

      res.status(response.statusCode).json(response);
    } catch (exception) {
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}

const deviceController = new DeviceController();

module.exports = deviceController;