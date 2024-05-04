const database = require("../database/Database.js");
const Category = require("../model/CategoryModel.js");
const { InternalServerException } = require("../utils/Exception.js");

class CategoryRepository {
  async getCategories({ organizationId }) {
    try {
      const results = await database.executeQuery({
        query: `SELECT * FROM category WHERE fk_organization_id = $1`,
        args: [organizationId],
      });
      const categories = results.map((result) => {
        return new Category({
          id: result.id,
          organizationId: result.fk_organization_id,
          name: result.name,
          description: result.description,
        });
      });
      return categories ?? [];
    } catch (error) {
      console.error(
        `CategoryRepository::getCategoryByOrganizationId error [${error}]`
      );
      throw new InternalServerException();
    }
  }

  async getCategoryById({ id }) {
    try {
      const result = await database.executeQuery({
        query: "SELECT * FROM category WHERE id = $1",
        args: [id],
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

  async createCategory({ organizationId, name, description }) {
    try {
      const result = await database.executeQuery({
        query:
          "INSERT INTO category(name,description,fk_organization_id) VALUES ($1, $2, $3) RETURNING *",
        args: [name, description, organizationId],
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

  async updateCategory({ id, name, description }) {
    try {
      const result = await database.executeQuery({
        query:
          "UPDATE category SET name = $2, description = $3 WHERE id = $1 RETURNING *",
        args: [id, name, description],
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

  async deleteCategory({ id }) {
    try {
      const result = await database.executeQuery({
        query: "DELETE FROM category WHERE id = $1 RETURNING *",
        args: [id],
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
