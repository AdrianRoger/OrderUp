const database = require("../database/database.js");
const Category = require("../model/category_model.js");
const {InternalServerException} = require('../utils/exceptions.js');

class CategoryRepository {
  async getCategories(categoryOrganizationId) {
    try {
      const results = await database.executeQuery({
        query: `SELECT * FROM category WHERE fk_organization_id = $1`,
        args: [categoryOrganizationId],
      });
      const categories = results.map((result) => {
        return new Category({
          id: result.id,
          organizationID: result.fk_organization_id,
          name: result.name,
          description: result.description,
        });
      });
      return categories ?? [];
    } catch (error) {
      console.error(`CategoryRepository::getCategoryByOrganizationId error [${error}]`);
      throw new InternalServerException();
    }
  }

  async getCategoryById(categoryId) {
    try {
      const result = await database.executeQuery({
        query: "SELECT * FROM category WHERE id = $1",
        args: [categoryId],
      });

      if (result.length === 0) {
        return null;
      }

      const category = new Category({
        id: result[0].id,
        organizationId: result[0].organization_id,
        name: result[0].name,
        description: result[0].description,
      });

      return category;
    } catch (error) {
      console.error(
        `categoryRepository::getcategoryBycategoryId error [${error}]`
      );
      throw new InternalServerException();
    }
  }

  async createCategory({
    categoryOrganizationId,
    categoryName,
    categoryDescription,
  }) {
    try {
     
      const result = await database.executeQuery({
        query:
          "INSERT INTO category(name,description,fk_organization_id) VALUES ($1, $2, $3) RETURNING *",
        args: [categoryName, categoryDescription, categoryOrganizationId],
      });

      const createdCategory = new Category({
        id: result[0].id,
        name: result[0].name,
        description: result[0].description,
        organizationId: result[0].fk_organization_id,
      });
      return createdCategory;
    } catch (error) {
      console.error(`CategoryRepository::createCategory error [${error}]`);
      throw new InternalServerException();
    }
  }

  async updateCategory({ categoryId, categoryName, categoryDescription }) {
    try {
      const result = await database.executeQuery({
        query:
          "UPDATE category SET name = $2, description = $3 WHERE id = $1 RETURNING *",
        args: [categoryId, categoryName, categoryDescription],
      });

      const updatedCategory = new Category({
        id: result[0].id,
        organizationId: result[0].organization_id,
        name: result[0].name,
        description: result[0].description,
      });

      return updatedCategory;
    } catch (error) {
      console.error(`CategoryRepository::editCategory error [${error}]`);
      throw new InternalServerException();
    }
  }

  async deleteCategory(categoryId) {
    try {
      console.log(categoryId);
      const result = await database.executeQuery({
        query: "DELETE FROM category WHERE id = $1 RETURNING *",
        args: [categoryId],
      });

      const deletedCategory = new Category({
        id: result[0].id,
        organizationId: result[0].organization_id,
        name: result[0].name,
        description: result[0].description,
      });

      return deletedCategory;
    } catch (error) {
      console.error(`CategoryRepository::deleteCategoryById error [${error}]`);
      throw new InternalServerException();
    }
  }

}

const categoryRepository = new CategoryRepository();

module.exports = categoryRepository;
