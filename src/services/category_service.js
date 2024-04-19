const categoryRepository = require("../repositories/category_repository.js");

class CategoryService {
  async getCategories() {
    try {
      return await categoryRepository.getCategories();
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
    
      // const categoryOrganization =
      //   await organizationRepository.getOrganizationById(
      //     categoryOrganizationId
      //   );

      // if (!categoryOrganization) {
      //   throw new NotFoundException("Organization not found");
      // }

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
        throw NotFoundException("category not found");
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
  
}

const categoryService = new CategoryService();

module.exports = categoryService;
