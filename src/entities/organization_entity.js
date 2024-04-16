export default class organization {
    constructor({ id, name, cnpj, email, telephone, zipcode, street, number, city, state, expire_date }) {
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
        this.expire_date = expire_date;
    }
}