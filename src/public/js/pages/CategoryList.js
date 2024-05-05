import AbstractPage from "./AbstractPage.js";
import deleteModal from "./DeleteModalPage.js";
import updateModal from "./UpdateModalPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Categories");
  }

  async getHtml() {
    const categories = document.createElement("div");
    categories.id = "list-items-container";
    try {
      const response = await fetch(
        "/api/categories/a7930dec-36ea-4a8d-998e-be326acfddf6"
      );

      const result = await response.json();
      const data = result.data;
      for (let d of data) {
        const divName = document.createElement("div");
        const divDescription = document.createElement("div");
        const titleName = document.createElement("p");
        titleName.classList.add("list-title");
        titleName.innerText = "Nome";
        const titleDescription = document.createElement("p");
        titleDescription.classList.add("list-title");
        titleDescription.innerText = "Descrição";
        const category = document.createElement("div");
        category.id = `${d.id}`;
        category.classList.add("list-item-box");
      
        const icones = document.createElement("div");
        const name = document.createElement("p");
        name.id = `${d.name}`;
        name.innerText = d.name;
        const description = document.createElement("p");
        description.id = `${d.description}`;
        description.innerText = d.description;
        const linkEditar = document.createElement("input");
        linkEditar.type = "image";
        linkEditar.src = "../../img/editar_icon.png";
         linkEditar.addEventListener("click",() => updateModal.getHtml(d));
        const linkDeletar = document.createElement("input");
        linkDeletar.type = "image";
        linkDeletar.src = "../../img/deletar_icon.png";
        linkDeletar.addEventListener("click", () => deleteModal.getHtml(d));
        divName.appendChild(titleName);
        divName.appendChild(name);
        divDescription.appendChild(titleDescription);
        divDescription.appendChild(description);
        icones.appendChild(linkEditar);
        icones.appendChild(linkDeletar);
        category.appendChild(divName);
        category.appendChild(divDescription);
        category.appendChild(icones);
        categories.appendChild(category);
      }
        return categories;
    
    } catch (error) {}
  }
}
