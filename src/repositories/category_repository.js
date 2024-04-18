const database = require("../database/database.js");
const Category = require("../model/category_model.js");
const Organization = require("../model/organization_model.js");

class CategoryRepository {
  async getCategories() {
    try {
      const results = await database.executeQuery({
        query: `SELECT category.*, organization.name AS organization FROM category
                INNER JOIN organization ON category.fk_organization_id = organization.id`,
      });

      const categories = results.map((result) => {
        return new Category({
          id: result.id,
          name: result.name,
          description: result.description,
          organizationId: new Organization({name: result.organization}),
        });
      });
      return categories ?? [];
    } catch (error) {
      console.error(`CategoryRepository::getCategories error [${error}]`);
      //throw new InternalServerException();
    }
  }
}

const categoryRepository = new CategoryRepository();

module.exports = categoryRepository;
