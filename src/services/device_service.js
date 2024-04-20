const deviceRepository = require('../repositories/device_repository.js');
const organizationRepository = require('../repositories/organization_repository.js');
const { NotFoundException } = require('../utils/exception.js');

class DeviceService{
    async list(){
        try {
            const device = await deviceRepository.list();

            return device;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }

    async getDeviceById(id){
        try {
            const device = await deviceRepository.getDeviceById(id);

            if(!device){
                throw new NotFoundException();
            }

            return device;
        } catch (exception) {
            throw exception;
        }
    }

    async getDeviceByOrganizationId(id){
        try {
            const organization = await organizationRepository.getOrganizationById(id);

            if(!organization){
                throw new NotFoundException();
            }

            const device = await deviceRepository.getDeviceByOrganizationId(id);

            return device;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }

    async create({ type, name, hashcode, organizationId }){
        try {
            const organization = organizationRepository.getOrganizationById(organizationId);

            if(!organization){
                throw new NotFoundException();
            }

            const createDevice = deviceRepository.create({ type, name, hashcode, organizationId });

            return createDevice;
        } catch (exception) {
            console.log(exception);
            throw new Error(exception);
        }
    }

    async update({ type, name, organizationId, id }){
        try {
            const deviceUpdate = await deviceRepository.getDeviceById(id);
            if(!deviceUpdate){
                throw new NotFoundException();
            }

            const organization = await organizationRepository.getOrganizationById(deviceUpdate.organizationId);
            if(!organization){
                throw new NotFoundException();
            }

            const updateDevice = await deviceRepository.update({ type, name, organizationId, id });

            return updateDevice;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }

    async delete(id){
        try {
            const device = await deviceRepository.getDeviceById(id);
            
            if(!device){
                throw new NotFoundException();
            }

            const deleteDevice = await deviceRepository.delete(id);

            return deleteDevice;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }
}

const deviceService = new DeviceService();

module.exports = deviceService;