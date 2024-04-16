class Dinning{
    constructor({ id, closed, device_id }){
        this.id = id;
        this.closed = closed;
        this.fk_device_id = device_id;
    }
}

module.exports = {
    Dinning
}