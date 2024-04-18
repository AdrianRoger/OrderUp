const categoryService = require('../services/category_service.js');

class CategoryController {
    async getCategories(req, res) {
      try {
        const categories = await categoryService.getCategories();
        
        // const response = new HttpResponse({
        //   statusCode: 200,
        //   data: recipes,
        // });
  
        res.status(200).json(categories);
      } catch (exception) {
        //const response = HttpResponse.fromException(exception);
        res.status(400).json("Ocorreu um erro");
      }
    }
}

const categoryController = new CategoryController();

module.exports = categoryController;