class Admin {
    constructor({ id, name, cpf, email, telephone, birthDate, password, organizationId }) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.telephone = telephone;
        this.birth_date = birthDate;
        this.password = password;
        this.organization_id = organizationId;
    }
}

module.exports = Admin;