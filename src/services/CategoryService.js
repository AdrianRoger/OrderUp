const categoryRepository = require("../repositories/CategoryRepository.js");
const { NotFoundException } = require("../utils/Exception.js");

class CategoryService {
  async getCategories(organizationId) {
    try {
      return await categoryRepository.getCategories(organizationId);
    } catch (exception) {
      throw exception;
    }
  }

  async getCategoryById(categoryId) {
    try {
      return await categoryRepository.getCategoryById(categoryId);
    } catch (exception) {
      throw exception;
    }
  }

  async createCategory({
    categoryOrganizationId,
    categoryName,
    categoryDescription,
  }) {
    try {

      const createdCategory = await categoryRepository.createCategory({
        categoryOrganizationId,
        categoryName,
        categoryDescription,
      });
      
      return createdCategory;
    } catch (exception) {
      throw exception;
    }
  }

  async updateCategory({ categoryId, categoryName, categoryDescription }) {
    try {
      const categoryToUpdate = await categoryRepository.getCategoryById(categoryId);

      if (!categoryToUpdate) {
        throw new NotFoundException("category not found");
      }

      const updatedCategory = await categoryRepository.updateCategory({
        categoryId,
        categoryName,
        categoryDescription,
      });

      return updatedCategory;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteCategory(categoryId) {
    try {
      const categoryToDelete = await categoryRepository.getCategoryById(categoryId);
      if (!categoryToDelete) {
        throw new NotFoundException("category not found");
      }

      const deletedCategory = await categoryRepository.deleteCategory(categoryId);

      return deletedCategory;
    } catch (exception) {
      throw exception;
    }
  }
  
}

const categoryService = new CategoryService();

module.exports = categoryService;