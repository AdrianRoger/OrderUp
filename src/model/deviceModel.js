class Device{
    constructor({ id, type, name, hashcode, organizationId }){
        this.id = id;
        this.type = type;
        this.name = name;
        this.hashcode = hashcode;
        this.organizationId = organizationId;
    }
}

module.exports = Device;