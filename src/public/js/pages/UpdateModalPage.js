import AbstractPage from "./AbstractPage.js";

class UpdateModal extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Delete");
  }

  async getHtml(d) {
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.classList.add("modal");
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    const imgFecharModal = document.createElement("img");
    imgFecharModal.classList.add("modal-close");
    imgFecharModal.src = "../../img/fechar_modal.png";
    const form = document.createElement("form");
    form.id = "form-update";
    form.classList.add("modal-text"); 
    const lblName = document.createElement("label");
    lblName.innerText = "Nome: ";
    const inputName = document.createElement("input");
    inputName.name = "name";
    inputName.value = d.name;
    const lblDescription = document.createElement("label");
    lblDescription.innerText = "Descrição: ";
    lblDescription.id = "label-description"
    const txtDescription = document.createElement("textarea");
    txtDescription.name = "description";
    txtDescription.rows = 5;
    txtDescription.cols = 50;
    txtDescription.value = d.description;
    const btnConfirmar = document.createElement("button");
    btnConfirmar.innerText = "Confirmar";
    btnConfirmar.classList.add("modal-button");
    form.appendChild(lblName);
    form.appendChild(inputName);
    form.appendChild(lblDescription);
    form.appendChild(txtDescription);
    modalContent.appendChild(imgFecharModal);
    modalContent.appendChild(form);
    modalContent.appendChild(btnConfirmar);
    modal.appendChild(modalContent);
    modal.style.display = "block";

    imgFecharModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    btnConfirmar.addEventListener("click", async () => {
      try {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "name": inputName.value,
            "description": txtDescription.value,
          }),
        };
        const response = await fetch(
          `http://localhost:3000/api/categories/${d.id}`,
          requestOptions
        );

        modal.style.display = "none";
        document.getElementById(d.name).textContent = inputName.value;
        document.getElementById(d.description).textContent = txtDescription.value;
      } catch (error) {}
    });

    return document.body.appendChild(modal);
  }
}

const updateModal = new UpdateModal();
export default updateModal;
