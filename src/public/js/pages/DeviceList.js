import AbastractPage from "./AbstractPage.js";


export default class extends AbastractPage {
  constructor() {
    super();
    this.setTitle("Devices");
  }

  async getHtml() {
    const devices = document.createElement("body");
    devices.id = "list-items-container";
    try {
     

      const response = await fetch(
        "/api/device"
      );

      const result = await response.json();
      const data = result;
     console.log(result);
      for (let d of data) {
        const divName = document.createElement("div");
        const divType = document.createElement("div");
        const titleName = document.createElement("p");
        titleName.classList.add("list-title");
        titleName.innerText = "Nome";
        const titleType = document.createElement("p");
        titleType.classList.add("list-title");
        titleType.innerText = "Tipo";
        const device = document.createElement("div");
        device.classList.add("list-item-box");
        const icones = document.createElement("div");
        const name = document.createElement("p");
        name.innerText = d.name;
        const type = document.createElement("p");
        type.innerText = d.type;
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
        divType.appendChild(titleType);
        divType.appendChild(type);
        linkEditar.appendChild(imgEditar);
        linkDeletar.appendChild(imgDeletar);
        icones.appendChild(linkEditar);
        icones.appendChild(linkDeletar);
        device.appendChild(divName);
        device.appendChild(divType);
        device.appendChild(icones);
        devices.appendChild(device);
      }
    } catch (error) {}

    return devices;
  }
}
