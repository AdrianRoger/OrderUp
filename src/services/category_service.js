const categoryRepository = require('../repositories/category_repository.js');

class CategoryService {
    async getCategories() {
      try {
        console.log(await categoryRepository.getCategories());
        return await categoryRepository.getCategories();
      } catch (exception) {
        throw exception;
      }
    }
}

const categoryService = new CategoryService();

module.exports = categoryService;