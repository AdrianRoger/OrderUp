const database = require('../database/database.js');
const device = require('../model/device_model.js');

class DeviceRepository{
    async list(){
        try {
            const result = await database.excuteQuery({
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
            throw new Error({ errorCode: 500, message: 'Internal Error in list!' });
        }
    }

    async getDeviceById(id){
        try {
            const result = await database.excuteQuery({
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
            throw new Error({ codeError: 500, message: 'Internal error in search Device!' });
        }
    }

    
}

const deviceRepository = new DeviceRepository();

module.exports = deviceRepository;