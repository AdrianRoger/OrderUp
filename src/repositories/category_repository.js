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
          organizationId: new Organization({id:result.org_id,name: result.organization}),
        });
      });
      return categories ?? [];
    } catch (error) {
      console.error(`CategoryRepository::getCategories error [${error}]`);
      //throw new InternalServerException();
    }
  }

  async createCategory({ categoryOrganizationId,categoryName,categoryDescription,}) {
    try {
      const result = await database.executeQuery({
        query:
          "INSERT INTO category(name,description,fk_organization_id) VALUES ($1, $2, $3) RETURNING *",
        args: [categoryName, categoryDescription ,categoryOrganizationId],
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
      //throw new InternalServerException();
    }
  }

}

const categoryRepository = new CategoryRepository();

module.exports = categoryRepository;
