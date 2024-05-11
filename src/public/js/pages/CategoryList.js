import AbstractPage from "./AbstractPage.js";
import deleteModal from "../components/DeleteModalPage.js";
import category from "../components/Category.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Categories");
  }

  async getHtml() {
    
    try {
      const response = await fetch(
        "/api/categories/a7930dec-36ea-4a8d-998e-be326acfddf6"
      );

      const result = await response.json();
      const data = result.data;
      
      const divList = document.createElement("div");
      divList.id = "list-container";
      
      const inputSearch = document.createElement("input"); 
      inputSearch.id = "search-input";
      inputSearch.addEventListener("input",search);
      
      const h1 = document.createElement("h1");
      h1.id = "list-title";
      h1.innerText = "Lista de Categorias";
     
      const table = document.createElement("table");
      table.id = "list-table";
      
      const thead = document.createElement("thead");
     
      const trTitles = document.createElement("tr");
      trTitles.id = "table-titles";
      
      const thName = document.createElement("th");
      thName.innerText = "Nome";
      
      const thDescription = document.createElement("th");
      thDescription.innerText = "Descrição";
      
      const btnNew = document.createElement("button");
      btnNew.id = "button-new";
      btnNew.innerText = "Nova Categoria";
      btnNew.addEventListener("click",category.create);
      
      const thNew = document.createElement("th");
      
      thNew.appendChild(btnNew);
      trTitles.appendChild(thName);
      trTitles.appendChild(thDescription);
      trTitles.appendChild(thNew);
      thead.appendChild(trTitles);
      table.appendChild(thead);
      divList.appendChild(inputSearch);
      divList.appendChild(h1);
      
      const tbody = document.createElement("tbody");
      
      let lineCont = 0;
      
      for (let d of data) {
        const trItem = document.createElement("tr");
        trItem.id = `${d.id}`;
        if(lineCont % 2 === 0){
          trItem.classList.add("tr-grey");
        }
        
        const tdNome = document.createElement("td");
        tdNome.id = `${d.name}`;
        tdNome.innerText = d.name;
        
        const tdDescription = document.createElement("td");
        tdDescription.innerText = d.description;
        tdDescription.id = `${d.description}`;
        
        const imgUpdate = document.createElement("img");
        imgUpdate.src = "../../img/editar_icon.png";
        imgUpdate.addEventListener("click",() => category.update(d));
        
        const tdIcons = document.createElement("td");
        tdIcons.appendChild(imgUpdate);
        
        const imgDelete = document.createElement("img");
        imgDelete.src = "../../img/deletar_icon.png";
        imgDelete.addEventListener("click",() => deleteModal.getHtml(d));
        
        tdIcons.appendChild(imgDelete);
        trItem.appendChild(tdNome);
        trItem.appendChild(tdDescription);
        trItem.appendChild(tdIcons);
        tbody.appendChild(trItem);
        
        lineCont++;
       }
       table.appendChild(tbody);
       divList.appendChild(table);

       function search(){ 
        const lines = document.getElementsByTagName("tr");
        
        for(let i = 1; i < lines.length; i++){
          const inputValue = inputSearch.value.toLowerCase();
          const categoryName = lines[i].getElementsByTagName('td')[0].textContent.toLowerCase();
          const categoryDescription = lines[i].getElementsByTagName('td')[1].textContent.toLowerCase();
          if(categoryName.includes(inputValue) || categoryDescription.includes(inputValue)){
              lines[i].style.display = "table-row";
            } else {
               lines[i].style.display = "none";
              }
         }
       }

        return divList;
    
    } catch (error) {}
  }
}


