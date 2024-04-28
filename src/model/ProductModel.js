  class Product {
    constructor({ id, organizationId, categoryId, name, price, description }) {
      this.id = id;
      this.organizationId = organizationId;
      this.categoryId = categoryId;
      this.name = name;
      this.price = price;
      this.description = description;
    }
  }

  module.exports = Product;