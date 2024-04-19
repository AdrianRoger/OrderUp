const dinningTableRepository = require('../repositories/dinningTable_repository.js');
const deviceRepository = require('../repositories/device_repository.js');

class DinningTableService{
    async list(){
        try {
            const dinningTables = await dinningTableRepository.list();

            return dinningTables;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }

    async getDinningTableById(id){
        try {
            const dinningTable = await dinningTableRepository.getDinningTableById(id);

            if(!dinningTable){
                throw new Error('Dinning table not found');
            }

            return dinningTable;
        } catch (exception) {
            throw exception;
        }
    }

    async getDinningTableToDeviceId(id){
        try {
            const device = await deviceRepository.getDeviceById(id);

            if(!device){
                throw new Error('Device not found');
            }

            const dinningTable = await dinningTableRepository.getDinningTableToDeviceId(id);

            return dinningTable;
        } catch (exception) {
            throw exception;
        }
    }

    async create({ closed, deviceId }){
        try {
            const device = deviceRepository.getDeviceById(deviceId);

            if(!device){
                throw new Error('Device not found!');
            }

            const createDinningTable = dinningTableRepository.create({ closed, deviceId });

            return createDinningTable;
        } catch (exception) {
            console.log(exception);
            throw new Error(exception);
        }
    }

    async update({ closed, id }){
        try {
            const dinningTableToUpdate = await dinningTableRepository.getDinningTableById(id);
            if(!dinningTableToUpdate){
                throw new Error('Dinning Table not found!');
            }

            const device = await deviceRepository.getDeviceById(dinningTableToUpdate.deviceId);
            if(!device){
                throw new Error('Device not found!');
            }

            const updateDinningTable = await dinningTableRepository.update({ closed, id });

            return updateDinningTable;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }

    async delete(id){
        try {
            const dinningTable = await dinningTableRepository.getDinningTableById(id);
            
            if(!dinningTable){
                throw new Error('Dinning Table not found');
            }

            const deletedDinningTable = await dinningTableRepository.delete(id);

            return deletedDinningTable;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }
}

const dinningTableService = new DinningTableService();

module.exports = dinningTableService;