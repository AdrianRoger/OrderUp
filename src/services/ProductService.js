const { productRepository } = require('../repositories');
const {
  NotFoundException,
  fileDeleter
} = require('../utils');

class ProductService {
  async getProducts() {
    try {
      return await productRepository.getProducts();
    } catch (exception) {
      throw exception;
    }
  }

  async getProductsByOrganizationId({ id }) {
    try {
      return await productRepository.getProductsByOrganizationId({ id });
    } catch (exception) {
      throw exception;
    }
  }

  async getProductById({ id }) {
    try {
      return await productRepository.getProductById({ id });
    } catch (exception) {
      throw exception;
    }
  }

  async createProduct({ name, price, description, imgName, categoryId, organizationId }) {
    try {
      const createdProduct = await productRepository.createProduct({
        name, price, description, imgName, categoryId, organizationId
      });

      return createdProduct;
    } catch (exception) {
      throw exception;
    }
  }

  async updateProduct({ id, name, price, description, imgName, categoryId, organizationId }) {
    try {
      const productToUpdate = await productRepository.getProductById({ id });

      if (!productToUpdate) {
        throw NotFoundException('Product not found.');
      }

      await fileDeleter.deleteFileByName(productToUpdate.imgName);

      const updatedProduct = await productRepository({
        id, name, price, description, imgName, categoryId, organizationId
      });

      return updatedProduct;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteProduct({ id }) {
    try {
      const productToDelete = await productRepository.getProductById({ id });

      if (!productToDelete) {
        throw NotFoundException('Product not found.');
      }

      await fileDeleter.deleteFileByName(productToDelete.imgName);

      const deletedFProduct = await productRepository.deleteProduct({ id });

      return deletedFProduct;
    } catch (exception) {
      throw exception;
    }
  }
}