export default class admin {
    constructor({ id, name, cpf, email, telephone, birth_date, password, fk_organization_id }) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.telephone = telephone;
        this.birth_date = birth_date;
        this.password = password;
        this.fk_organization_id = fk_organization_id;
    }
}