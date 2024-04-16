export default class Category {
    constructor({ id, organization_id, name, description }) {
      this.id = id;
      this.organization_id = organization_id;
      this.name = name;
      this.description = description;
    }
  }