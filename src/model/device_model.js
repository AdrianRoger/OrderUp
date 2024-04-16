class Device{
    constructor({ id, type, name, hashcode, organiation_id }){
        this.id = id;
        this.type = type;
        this.name = name;
        this.hashcode = hashcode;
        this.fk_organiation_id = organiation_id;
    }
}

module.exports = {
    Device
}