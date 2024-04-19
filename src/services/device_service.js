const deviceRepository = require('../repositories/device_repository.js');

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
                throw new Error('Device not found');
            }

            return device;
        } catch (exception) {
            throw exception;
        }
    }
}

const deviceService = new DeviceService();

module.exports = deviceService;