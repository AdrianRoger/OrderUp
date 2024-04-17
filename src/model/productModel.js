  class Product {
    constructor({ id, organization_id, category_id, name, price, description }) {
      this.id = id;
      this.organization_id = organization_id;
      this.category_id = category_id;
      this.name = name;
      this.price = price;
      this.description = description;
    }
  }

  module.exports = Product;