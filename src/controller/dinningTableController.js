const deviceService = require('../services/DeviceService.js');
const dinningTableService = require('../services/DinningTableService.js');
const { BadRequestException } = require('../utils/Exception.js');
const httpResponse = require('../utils/HttpResponse.js');

class DinningTableController{
    async getDinningTable(req, res){
        try {
            const dinningTable = await dinningTableService.getDinningTable();

            const response = await new httpResponse({
                statusCode: 200,
                data: dinningTable
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async getDinningTableById(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new BadRequestException('Dinning Table ID must be a non-empty string');
            }

            const dinningTable = await dinningTableService.getDinningTableById(id);

            const response = await new httpResponse({
                statusCode: 200,
                data: dinningTable
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async getDinningTableByDeviceId(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new BadRequestException('Dinning Table ID must be valid');
            }

            const device = await dinningTableService.getDinningTableByDeviceId(id);

            const response = await new httpResponse({
                statusCode: 200,
                data: device
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            console.log(exception)
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async createDinningTable(req, res){
        try {
            const closed = req.body.closed;
            const deviceId = String(req.body.deviceId ?? '');
    
            if(typeof(closed) !== 'boolean'){
                throw new BadRequestException('Dinning Table closed must be a non-empty Boolean!');
            }
            if(deviceId.length === 0){
                throw new BadRequestException('Dinning Table ID must be a non-empty string');
            }
    
            const createdDinningTable = await dinningTableService.createDinningTable({ closed, deviceId });
    
            const response = await new httpResponse({
                statusCode: 201,
                data: createdDinningTable
            });

            res.status(response.statusCode).json(response.data);  
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async updateDinningTable(req, res){
        try {
            const closed = req.body.closed;
            const id = String(req.params.id ?? '');

            if(typeof(closed) !== 'boolean'){
                throw new BadRequestException('Dinning Table closed must be a non-empty Boolean!');
            }

            const updatedDinningTable = await dinningTableService.updateDinningTable({ closed, id });

            const response = await new httpResponse({
                statusCode: 200,
                data: updatedDinningTable
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }

    async deleteDinningTable(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new BadRequestException('Dinning Table closed must be a non-empty String!');
            }

            const deletedDinningTable = await dinningTableService.deleteDinningTable(id);

            const response = await new httpResponse({
                statusCode: 200,
                data: deletedDinningTable
            });

            res.status(response.statusCode).json(response.data);
        } catch (exception) {
            const response = httpResponse.fromException(exception);
            res.status(response.statusCode).json(response);
        }
    }
}

const dinningTableController = new DinningTableController();

module.exports = dinningTableController;