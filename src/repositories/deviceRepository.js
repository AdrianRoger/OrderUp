const database = require('../database/database.js');
const device = require('../model/DeviceModel.js');
const { InternalServerException } = require('../utils/Exception.js');

class DeviceRepository{
    async getDevices(){
        try {
            const result = await database.executeQuery({
                query: 'SELECT * FROM device'
            })
    
            const devices = result.map((result) => {
                return new device({
                    id: result.id,
                    type: result.type,
                    name: result.name,
                    hashCode: result.hashCode,
                    organizationId: result.fk_organization_id
                });
            })
    
            return devices ?? [];   
        } catch (error) {
            console.error(`Error during list: ${error}`);
            throw new InternalServerException();
        }
    }

    async getDeviceById(id){
        try {
            const result = await database.executeQuery({
                query: 'SELECT * FROM device WHERE id = $1',
                args: [id]
            });

            if(result.length === 0){
                return null;
            }

            const deviceSelected = new device({
                id: result[0].id,
                type: result[0].closed,
                name: result[0].name,
                hashcode: result[0].hashcode,
                organizationId: result[0].fk_organization_id
            });

            return deviceSelected
        } catch (error) {
            console.error(`Device dont found ${error}`);
            throw new InternalServerException();
        }
    }
    
    async getDeviceByOrganizationId(id){
        try {
            const results = await database.executeQuery({
                query: 'SELECT * FROM device WHERE fk_organization_id = $1',
                args: [id]
            });

            const deviceSelected = results.map(result => {
                return new device({
                    id: result.id,
                    type: result.closed,
                    name: result.name,
                    hashcode: result.hashcode,
                    organizationId: result.fk_organization_id
                });
            });

            return deviceSelected ?? [];
        } catch (error) {
            console.error(`Error in search Device ${error}`);
            throw new InternalServerException();
        }
    }

    async createDevice({ type, name, hashcode, organizationId }){
        try {
            const result = await database.executeQuery({
                query: 'INSERT INTO device (type, name, hashcode, fk_organization_id) VALUES ($1, $2, $3, $4) RETURNING *',
                args: [type, name, hashcode, organizationId]
            });

            const createDevice = new device({
                id: result[0].id,
                type: result[0].type,
                name: result[0].name,
                hashcode: result[0].hashcode,
                organizationId: result[0].fk_organization_id
            });

            return createDevice
        } catch (error) {
            console.error('Error in create the Device: ', error);
            throw new InternalServerException();
        }
    }

    async updateDevice({ type, name, organizationId, id }){
        try {
            const result = await database.executeQuery({
                query: 'UPDATE device SET type = $1, name = $2, fk_organization_id = $3 WHERE id = $4 RETURNING *',
                args: [type, name, organizationId, id]
            });

            const updateDevice = new device({
                id: result[0].id,
                type: result[0].type,
                name: result[0].name,
                hashcode: result[0].hashcode,
                organizationId: result[0].fk_organization_id
            });

            return updateDevice;
        } catch (error) {
            console.error(`Internal Server Error ${error}`);
            throw new InternalServerException();
        }
    }

    async deleteDevice(id){
        try {
            const result = await database.executeQuery({
                query: 'DELETE FROM device WHERE id = $1 RETURNING *',
                args: [id]
            });

            const deleteDevice = new device({
                id: result[0].id,
                type: result[0].type,
                name: result[0].name,
                hashcode: result[0].hashcode,
                organizationId: result[0].fk_organization_id
            });

            return deleteDevice;
        } catch (error) {
            console.error(`Error in delete ${error}`);
            throw new InternalServerException();
        }
    }
}

const deviceRepository = new DeviceRepository();

module.exports = deviceRepository;