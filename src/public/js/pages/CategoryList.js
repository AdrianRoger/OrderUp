import AbstractPage from "./AbstractPage.js";


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
        category.classList.add("list-item-box");
        const icones = document.createElement("div");
        const name = document.createElement("p");
        name.innerText = d.name;
        const description = document.createElement("p");
        description.innerText = d.description;
        const linkEditar = document.createElement("a"); 
        //linkEditar.href = '/'
        const linkDeletar = document.createElement("a");
        //linkDeletar.href = 
        const imgEditar = document.createElement("img");
        imgEditar.src = "../../img/editar_icon.png";
        const imgDeletar = document.createElement("img");
        imgDeletar.src = "../../img/deletar_icon.png";
        divName.appendChild(titleName);
        divName.appendChild(name);
        divDescription.appendChild(titleDescription);
        divDescription.appendChild(description);
        linkEditar.appendChild(imgEditar);
        linkDeletar.appendChild(imgDeletar);
        icones.appendChild(linkEditar);
        icones.appendChild(linkDeletar);
        category.appendChild(divName);
        category.appendChild(divDescription);
        category.appendChild(icones);
        categories.appendChild(category);
      }
    } catch (error) {}

    return categories;
  }
}
