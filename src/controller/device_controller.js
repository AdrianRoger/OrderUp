const deviceService = require('../services/device_service.js');

class DeviceController{
    async list(req, res){
        try {
            const devices = await deviceService.list();

            res.status(200).json(devices);
        } catch (exception) {
            console.error(exception);
            res.status(201).json(exception);
        }
    }

    async getDeviceById(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new Error('Device id error');
            }

            const device = await deviceService.getDeviceById(id);

            res.status(200).json(device);
        } catch (exception) {
            console.error(exception);
            res.status(500).json(exception);
        }
    }
}

const deviceController = new DeviceController();

module.exports = deviceController;