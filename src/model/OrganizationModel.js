class Organization {
  constructor({ id, name, cnpj, email, telephone, zipcode, street, number, city, state, expireDate }) {
    this.id = id;
    this.name = name;
    this.cnpj = cnpj;
    this.email = email;
    this.telephone = telephone;
    this.zipcode = zipcode;
    this.street = street;
    this.number = number;
    this.city = city;
    this.state = state;
    this.expireDate = expireDate;
  }
}

module.exports = Organization;