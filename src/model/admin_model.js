class Admin {
    constructor({ id, name, cpf, email, telephone, birth_date, password, organization_id }) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.telephone = telephone;
        this.birth_date = birth_date;
        this.password = password;
        this.organization_id = organization_id;
    }
}

module.exports = Admin;