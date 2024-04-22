const dinningTableRepository = require('../repositories/DinningTableRespository.js');
const deviceRepository = require('../repositories/DeviceRepository.js');
const { NotFoundException } = require('../utils/Exception.js');

class DinningTableService{
    async getDinningTable(){
        try {
            const dinningTables = await dinningTableRepository.getDinningTable();

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
                throw new NotFoundException();
            }

            return dinningTable;
        } catch (exception) {
            throw exception;
        }
    }

    async getDinningTableByDeviceId(id){
        try {

            const device = await deviceRepository.getDeviceById(id);

            if(!device){
                throw new NotFoundException();
            }

            const dinningTable = await dinningTableRepository.getDinningTableByDeviceId(id);

            return dinningTable;
        } catch (exception) {
            throw exception;
        }
    }

    async createDinningTable({ closed, deviceId }){
        try {
            const device = deviceRepository.getDeviceById(deviceId);

            if(!device){
                throw new NotFoundException();
            }

            const createDinningTable = dinningTableRepository.createDinningTable({ closed, deviceId });

            return createDinningTable;
        } catch (exception) {
            console.log(exception);
            throw new Error(exception);
        }
    }

    async updateDinningTable({ closed, id }){
        try {
            const dinningTableToUpdate = await dinningTableRepository.getDinningTableById(id);
            if(!dinningTableToUpdate){
                throw new NotFoundException();
            }

            const device = await deviceRepository.getDeviceById(dinningTableToUpdate.deviceId);
            if(!device){
                throw new NotFoundException();
            }

            const updateDinningTable = await dinningTableRepository.updateDinningTable({ closed, id });

            return updateDinningTable;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }

    async deleteDinningTable(id){
        try {
            const dinningTable = await dinningTableRepository.getDinningTableById(id);
            
            if(!dinningTable){
                throw new NotFoundException();
            }

            const deletedDinningTable = await dinningTableRepository.deleteDinningTable(id);

            return deletedDinningTable;
        } catch (exception) {
            console.error(exception);
            throw exception;
        }
    }
}

const dinningTableService = new DinningTableService();

module.exports = dinningTableService;