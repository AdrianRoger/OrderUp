const categoryRepository = require("../repositories/category_repository.js");
const { NotFoundException } = require("../utils/exceptions.js");

class CategoryService {
  async getCategories(organizationId) {
    try {
      return await categoryRepository.getCategories(organizationId);
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

  async deleteCategoryById(categoryId) {
    try {
      const categoryToDelete = await categoryRepository.getCategoryById(categoryId);
      console.log(categoryToDelete);
      if (!categoryToDelete) {
        throw new NotFoundException("category not found");
      }

      const deletedCategory = await categoryRepository.deleteCategoryById(categoryId);

      return deletedCategory;
    } catch (exception) {
      throw exception;
    }
  }
  
}

const categoryService = new CategoryService();

module.exports = categoryService;
