const categoryRepository = require("../repositories/CategoryRepository.js");
const { NotFoundException } = require("../utils");

class CategoryService {
  async getCategories({ organizationId }) {
    try {
      return await categoryRepository.getCategories({ organizationId });
    } catch (exception) {
      throw exception;
    }
  }

  async getCategoryById({ id }) {
    try {
      return await categoryRepository.getCategoryById({ id });
    } catch (exception) {
      throw exception;
    }
  }

  async createCategory({
    organizationId,
    name,
    description,
  }) {
    try {

      const createdCategory = await categoryRepository.createCategory({
        organizationId,
        name,
        description
      });

      return createdCategory;
    } catch (exception) {
      throw exception;
    }
  }

  async updateCategory({ id, name, description }) {
    try {
      const categoryToUpdate = await categoryRepository.getCategoryById({ id });

      if (!categoryToUpdate) {
        throw new NotFoundException("category not found");
      }

      const updatedCategory = await categoryRepository.updateCategory({
        id,
        name,
        description
      });

      return updatedCategory;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteCategory({ id }) {
    try {
      const categoryToDelete = await categoryRepository.getCategoryById({ id });
      if (!categoryToDelete) {
        throw new NotFoundException("category not found");
      }

      const deletedCategory = await categoryRepository.deleteCategory({ id });

      return deletedCategory;
    } catch (exception) {
      throw exception;
    }
  }

}

const categoryService = new CategoryService();

module.exports = categoryService;
