const { json } = require('express');
const dinningTableService = require('../services/dinningTable_service.js');

class DinningTableController{
    async list(req, res){
        try {
            const dinningTable = await dinningTableService.list();

            res.status(200).json(dinningTable);
        } catch (exception) {
            console.error(exception);
            res.status(400).json(exception);
        }
    }

    async getDinningTableById(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new Error('Dinning Table id error');
            }

            const dinningTable = await dinningTableService.getDinningTableById(id);

            res.status(200).json(dinningTable);
        } catch (exception) {
            console.error(exception);
            res.status(400).json(exception);
        }
    }

    async getDinningTableToDeviceId(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new Error('Dinning Table id must be valid');
            }

            const dinningTable = await dinningTableService.getDinningTableToDeviceId(id);

            res.status(200).json(dinningTable);
        } catch (error) {
            console.error(error);
            res.status(400).json(error);
        }
    }

    async create(req, res){
        try {
            const closed = req.body.closed;
            const deviceId = String(req.body.deviceId ?? '');
    
            if(typeof(closed) !== 'boolean'){
                throw new Error('Bad Request!');
            }
            if(deviceId.length === 0){
                throw new Error('Device Id must be a non-empty string');
            }
    
            const createdDinningTable = await dinningTableService.create({ closed, deviceId });
    
            res.status(200).json(createdDinningTable);   
        } catch (exception) {
            console.error(exception)
            res.status(400).json(exception);
        }
    }

    async update(req, res){
        try {
            const closed = req.body.closed;
            const id = String(req.params.id ?? '');

            if(typeof(closed) !== 'boolean'){
                throw new Error('Bad Request!');
            }

            const updatedDinningTable = await dinningTableService.update({ closed, id });

            res.status(200).json(updatedDinningTable)
        } catch (exception) {
            console.error(exception);
            res.status(400).json(exception);
        }
    }

    async delete(req, res){
        try {
            const id = String(req.params.id ?? '');

            if(id.length === 0){
                throw new Error('Dinning Table Id must be a non-empty string');
            }

            const deletedDinningTable = await dinningTableService.delete(id);

            res.status(200).json(deletedDinningTable);
        } catch (exception) {
            console.error(exception);
            res.status(400).json(exception);
        }
    }
}

const dinningTableController = new DinningTableController();

module.exports = dinningTableController;