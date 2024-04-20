const database = require('../database/database.js');
const dinningTable = require('../model/dinningTable_model.js');
const { InternalServerException } = require('../utils/exception.js')

class DinningTableRepository{
    async list(){
        try {
            const result = await database.executeQuery({
                query: 'SELECT * FROM dinning_table'
            })
    
            const dinningTables = result.map((result) => {
                return new dinningTable({
                    id: result.id,
                    closed: result.closed,
                    deviceId: result.fk_device_id
                });
            })
    
            return dinningTables ?? [];   
        } catch (error) {
            console.error(`Error during list: ${error}`);
            throw new InternalServerException();
        }
    }

    async getDinningTableById(id){
        try {
            const result = await database.executeQuery({
                query: 'SELECT * FROM dinning_table WHERE id = $1',
                args: [id]
            });

            if(result.length === 0){
                return null;
            }

            const dinningTableSelected = new dinningTable({
                id: result[0].id,
                closed: result[0].closed,
                deviceId: result[0].fk_device_id
            });

            return dinningTableSelected
        } catch (error) {
            console.error(`Dinning Table dont found ${error}`);
            throw new InternalServerException();
        }
    }

    async getDinningTableToDeviceId(id){
        try {
            const results = await database.executeQuery({
                query: 'SELECT * FROM dinning_table WHERE fk_device_id = $1',
                args: [id]
            });

            const dinningTableSelected = results.map(result => {
                return new dinningTable({
                    id: result.id,
                    closed: result.closed,
                    deviceId: result.fk_device_id
                });
            });

            return dinningTableSelected ?? [];
        } catch (error) {
            console.error(`Error in search Dinning Table ${error}`);
            throw new InternalServerException();
        }
    }

    async create({ closed, deviceId }){
        try {
            const result = await database.executeQuery({
                query: 'INSERT INTO dinning_table (closed, fk_device_id) VALUES ($1, $2) RETURNING *',
                args: [closed, deviceId]
            });

            const createDinningTable = new dinningTable({
                id: result[0].id,
                closed: result[0].closed,
                deviceId: result[0].fk_device_id
            });

            return createDinningTable
        } catch (error) {
            console.error('Error in create the dinningTable', error);
            throw new InternalServerException();
        }
    }

    async update({ closed, id }){
        try {
            const result = await database.executeQuery({
                query: 'UPDATE dinning_table SET closed = $1 WHERE id = $2 RETURNING *',
                args: [closed, id]
            });

            const updatedDinningTable = new dinningTable({
                id: result[0].id,
                closed: result[0].closed,
                deviceId: result[0].fk_device_id
            });

            return updatedDinningTable;
        } catch (error) {
            console.error(`Internal Server Error ${error}`);
            throw new InternalServerException();
        }
    }

    async delete(id){
        try {
            const result = await database.executeQuery({
                query: 'DELETE FROM dinning_table WHERE id = $1 RETURNING *',
                args: [id]
            });

            const deletedDinningTable = new dinningTable({
                id: result[0].id,
                closed: result[0].closed,
                deviceId: result[0].fk_device_id
            });

            return deletedDinningTable;
        } catch (error) {
            console.error(`Error in delete ${error}`);
            throw new InternalServerException();
        }
    }
}

const dinningTableRepository = new DinningTableRepository();

module.exports = dinningTableRepository;