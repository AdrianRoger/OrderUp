import AbastractPage from "./AbstractPage.js";
import deleteModal from "../components/DeleteModalPage.js";
import device from "../components/Device.js";

export default class extends AbastractPage {
  constructor() {
    super();
    this.setTitle("Devices");
  }

  async getHtml() {
    
    try {
      const response = await fetch(
        "/api/device/"
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
      h1.innerText = "Lista de Dispositivos";
      
      const table = document.createElement("table");
      table.id = "list-table";
      
      const thead = document.createElement("thead");
      
      const trTitles = document.createElement("tr");
      trTitles.id = "table-titles";
      
      const thName = document.createElement("th");
      thName.innerText = "Nome";
      
      const thTipo = document.createElement("th");
      thTipo.innerText = "Tipo";
      
      const thHashcode = document.createElement("th");
      thHashcode.innerText = "Hashcode";
      
      const btnNew = document.createElement("button");
      btnNew.id = "button-new";
      btnNew.innerText = "Novo Dispositivo";
      btnNew.addEventListener("click",device.create);
      const thNew = document.createElement("th");
      
      thNew.appendChild(btnNew);
      trTitles.appendChild(thName);
      trTitles.appendChild(thTipo);
      trTitles.appendChild(thHashcode);
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
        
        const tdTipo = document.createElement("td");
        tdTipo.innerText = d.type;
        tdTipo.id = `${d.type}`;
        
        const tdHashcode = document.createElement("td");
        tdHashcode.innerText = d.hashcode;
        tdHashcode.id = `${d.hashcode}`;
        
        const imgUpdate = document.createElement("img");
        imgUpdate.src = "../../img/editar_icon.png";
        imgUpdate.addEventListener("click",() => device.update(d));
        
        const tdIcons = document.createElement("td");
        tdIcons.appendChild(imgUpdate);
        
        const imgDelete = document.createElement("img");
        imgDelete.src = "../../img/deletar_icon.png";
        imgDelete.addEventListener("click",() => deleteModal.getHtml(d));
        tdIcons.appendChild(imgDelete);
        trItem.appendChild(tdNome);
        trItem.appendChild(tdTipo);
        trItem.appendChild(tdHashcode);
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
          const deviceName = lines[i].getElementsByTagName('td')[0].textContent.toLowerCase();
          const deviceTipo = lines[i].getElementsByTagName('td')[1].textContent.toLowerCase();
          if(deviceName.includes(inputValue) || deviceTipo.includes(inputValue)){
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
