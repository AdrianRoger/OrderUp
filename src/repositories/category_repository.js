const database = require("../database/database.js");
const Category = require("../model/category_model.js");
const Organization = require("../model/organization_model.js");

class CategoryRepository {
  async getCategories() {
    try {
      const results = await database.executeQuery({
        query: `SELECT category.*, organization.name AS organization, organization.id AS org_id FROM category
                INNER JOIN organization ON category.fk_organization_id = organization.id WHERE organization.name = 'Restaurante ABC';`,
      });

      const categories = results.map((result) => {
        return new Category({
          id: result.id,
          name: result.name,
          description: result.description,
          organizationId: new Organization({
            id: result.org_id,
            name: result.organization,
          }),
        });
      });
      return categories ?? [];
    } catch (error) {
      console.error(`CategoryRepository::getCategories error [${error}]`);
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

  async getCategoriesByOrganizationId(categoryOrganizationId) {
    try {
      const results = await database.executeQuery({
        query: `SELECT * from category WHERE organization_id = $1`,
        args: [categoryOrganizationId],
      });

      const categories = results.map((result) => {
        return new Category({
          id: result.id,
          organizationId: result.organization_id,
          name: result.name,
          description: result.description,
        });
      });
      return categories ?? [];
    } catch (error) {
      console.error(`CategoryRepository::getCategoryByUserId error [${error}]`);
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
}

const categoryRepository = new CategoryRepository();

module.exports = categoryRepository;
