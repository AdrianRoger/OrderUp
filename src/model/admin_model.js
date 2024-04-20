class Admin {
  constructor({ id, name, cpf, email, telephone, birthDate, password, type, organizationId }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.telephone = telephone;
    this.birthDate = birthDate;
    this.password = password;
    this.type = type;
    this.organizationId = organizationId;
  }
}

module.exports = Admin;