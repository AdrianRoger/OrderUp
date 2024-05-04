const categoryService = require("../services/CategoryService.js");
const { BadRequestException } = require("../utils/Exception.js");
const { HttpResponse } = require("../utils");

class CategoryController {
  async getCategories(req, res) {
    try {
      //const organizationId = String(req.cookies.organization_id ?? "");
      const organizationId = String(req.params.orgId ?? "");
      const categories = await categoryService.getCategories({ organizationId });

      if (organizationId.length === 0) {
        throw new BadRequestException(
          "Organization id must be a non-empty string"
        );
      }
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

  async getCategoryById(req, res) {
    try {
      const categoryId = String(req.params.id ?? "");
      if (categoryId.length === 0) {
        throw new BadRequestException("category id must be a non-empty string");
      }
      const category = await categoryService.getCategoryById({ id: categoryId });
      const response = new HttpResponse({
        statusCode: 200,
        data: category,
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

      if (categoryOrganizationId.length === 0) {
        throw new BadRequestException(
          "Organization id must be a non-empty string"
        );
      }

      if (categoryName.length === 0) {
        throw new BadRequestException(
          "Category name must be a non-empty string"
        );
      }

      if (categoryDescription.length === 0) {
        throw new BadRequestException(
          "Category description must be a non-empty string"
        );
      }

      const createdCategory = await categoryService.createCategory({
        organizationId: categoryOrganizationId,
        name: categoryName,
        description: categoryDescription,
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

  async updateCategory(req, res) {
    try {
      const categoryId = String(req.params.id ?? "");
      const categoryName = String(req.body.name ?? "");
      const categoryDescription = String(req.body.description ?? "");

      if (categoryId.length === 0) {
        throw new BadRequestException("category id must be a non-empty string");
      }

      if (categoryName.length === 0) {
        throw new BadRequestException(
          "category name must be a non-empty string"
        );
      }

      if (categoryDescription.length === 0) {
        throw new BadRequestException(
          "category description must be a non-empty string"
        );
      }

      const updatedCategory = await categoryService.updateCategory({
        id: categoryId,
        name: categoryName,
        description: categoryDescription,
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

  async deleteCategory(req, res) {
    try {
      const categoryId = String(req.params.id ?? "");

      if (categoryId.length === 0) {
        throw new BadRequestException("category id must be a non-empty string");
      }

      const deletedCategory = await categoryService.deleteCategory({ id: categoryId });

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedCategory,
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
