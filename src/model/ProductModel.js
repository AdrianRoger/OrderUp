class Product {
  constructor({ id, name, price, description, imgName, categoryId, organizationId }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imgName = imgName;
    this.categoryId = categoryId;
    this.organizationId = organizationId;
  }
}

module.exports = Product;