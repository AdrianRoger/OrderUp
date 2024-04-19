const categoryService = require('../services/category_service.js');
const  {BadRequestException}  = require('../utils/exceptions.js');
const HttpResponse = require('../utils/http_response.js');

class CategoryController {
    async getCategories(req, res) {
      try {
        const categories = await categoryService.getCategories();
        
         const response = new HttpResponse({
           statusCode: 200,
           data: categories,
         });
  
        res.status(response.statusCode).json(response);
      } catch (exception) {
        const response = HttpResponse.fromException(exception);
        res.status(response.statusCode).json(response);
      }
    }

    async createCategory(req, res) {
      try {
        const categoryOrganizationId = String(req.body.organization_id ?? "");
        const categoryName = String(req.body.name ?? "");
        const categoryDescription = String(req.body.description ?? "");
  
        if (categoryOrganizationId === 0) {
          throw new BadRequestException("Organization id must be a non-empty string");
        }
  
        if (categoryName.length === 0) {
          throw new BadRequestException(
            "Category name must be a non-empty string",
          );
        }
  
        if (categoryDescription.length === 0) {
          throw new BadRequestException(
            "Category description must be a non-empty string",
          );
        }
  
        const createdCategory = await categoryService.createCategory({
          categoryOrganizationId,
          categoryName,
          categoryDescription,
        });
  
         const response = new HttpResponse({
           statusCode: 200,
           data: createdCategory,
         });
  
        res.status(response.statusCode).json(response);
      } catch (exception) {
       const response = HttpResponse.fromException(exception);
        res.status(response.statusCode).json(response);
      }
    }

    async updateCategoryById(req, res) {
      try {
        const categoryId = String(req.params.id ?? "");
        const categoryName = String(req.body.name ?? "");
        const categoryDescription = String(req.body.description ?? "");
  
        if (categoryId.length === 0) {
          throw new BadRequestException("category id must be a non-empty string");
        }
  
        if (categoryName.length === 0) {
          throw new BadRequestException(
            "category name must be a non-empty string",
          );
        }
  
        if (categoryDescription.length === 0) {
          throw new BadRequestException(
            "category description must be a non-empty string",
          );
        }
  
        const updatedCategory = await categoryService.updateCategory({
          categoryId,
          categoryName,
          categoryDescription,
        });
  
        const response = new HttpResponse({
          statusCode: 200,
          data: updatedCategory,
        });
  
        res.status(response.statusCode).json(response);
      } catch (exception) {
        const response = HttpResponse.fromException(exception);
        res.status(response.statusCode).json(response);
      }
    }
  
 

}

const categoryController = new CategoryController();

module.exports = categoryController;