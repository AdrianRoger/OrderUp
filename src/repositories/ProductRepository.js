const database = require('../database/Database.js');
const Product = require('../model/ProductModel.js');
const { InternalServerException, NotFoundException } = require('../utils');

class ProductRepository {
  async getProducts() {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM product`,
      });

      const products = result.map(result => {
        return new Product({
          id: result.id,
          name: result.name,
          price: result.price,
          description: result.description,
          imgName: result.image_name,
          categoryId: result.fk_category_id,
          organizationId: result.fk_organization_id,
        });
      });

      return products ?? []; 
    } catch (error) {
      console.log(`ProductRepository::getProducts error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getProductsByOrganizationId({ organizationId }) {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM product WHERE fk_organization_id = $1`,
        args: [organizationId]
      });

      const products = result.map(result => {
        return new Product({
          id: result.id,
          name: result.name,
          price: result.price,
          description: result.description,
          imgName: result.image_name,
          categoryId: result.fk_category_id,
          organizationId: result.fk_organization_id,
        });
      });

      return products ?? []; 
    } catch (error) {
      console.log(`ProductRepository::getProductsByOrganizationId error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getProductById({ id }) {
    try {
      const result = await database.executeQuery({
        query: `SELECT * FROM product where id = $1`,
        args: [id],
      });

      const product = new Product({
        id: result[0].id,
        name: result[0].name,
        price: result[0].price,
        description: result[0].description,
        imgName: result[0].image_name,
        categoryId: result[0].fk_category_id,
        organizationId: result[0].fk_organization_id,
      });

      return product;
    } catch (error) {
      console.error(`ProductRepository::getProductById error [${error}]`);
      throw new NotFoundException('Product not found.');
    }
  }

  async createProduct({ name, price, description, imgName, categoryId, organizationId }) {
    try {
      const result = await database.executeQuery({
        query: "INSERT INTO product (name, price, description, image_name, fk_category_id, fk_organization_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        args: [name, price, description, imgName, categoryId, organizationId],
      });

      const createdProduct = new Product({
        id: result[0].id,
        name: result[0].name,
        price: result[0].price,
        description: result[0].description,
        imgName: result[0].image_name,
        categoryId: result[0].fk_category_id,
        organizationId: result[0].fk_organization_id,
      });

      return createdProduct;
    } catch (error) {
      console.error(`ProductRepository::createProduct error [${error}]`);
      throw new InternalServerException();
    }
  }

  async updateProduct({ id, name, price, description, imgName, categoryId }){
    try{
      const result = await database.executeQuery({
        query: `UPDATE product SET name = $2, price = $3, description = $4, image_name = $5, fk_category_id = $6 WHERE id = $1 RETURNING *`,
        args: [id, name, price, description, imgName, categoryId],
      });

      const updatedProduct = new Product({
        id: result[0].id,
        name: result[0].name,
        price: result[0].price,
        description: result[0].description,
        imgName: result[0].image_name,
        categoryId: result[0].fk_category_id,
        organizationId: result[0].fk_organization_id,
      });

      return updatedProduct;
    }catch(error){
      console.error(`ProductRepository::updateProduct error [${error}]`);
      throw new InternalServerException();
    }
  }

  async deleteProduct({ id }){
    try{
      const result = await database.executeQuery({
        query: `DELETE FROM product WHERE id = $1 RETURNING *`,
        args: [id]
      });

      const deletedProduct = new Product({
        id: result[0].id,
        name: result[0].name,
        price: result[0].price,
        description: result[0].description,
        imgName: result[0].image_name,
        categoryId: result[0].fk_category_id,
        organizationId: result[0].fk_organization_id,
      });

      return deletedProduct;
    }catch(error){
      console.error(`ProductReposaitory::deleteProduct error [${error}]`);
      throw new InternalServerException();
    }
  }
}

const productRepository = new ProductRepository();

module.exports = productRepository;
