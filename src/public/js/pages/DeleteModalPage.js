import AbstractPage from "./AbstractPage.js";

class DeleteModal extends AbstractPage {
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

    const question = document.createElement("p");
    question.id = "question";
    question.classList.add("modal-text");
    question.innerHTML = `<span id="important">Importante!</span><p>Tem certeza que deseja excluir o item ${d.name}?</p>`;
    const btnConfirmar = document.createElement("button");
    btnConfirmar.innerText = "Confirmar";
    btnConfirmar.classList.add("modal-button");
    modalContent.appendChild(imgFecharModal);
    modalContent.appendChild(question);
    modalContent.appendChild(btnConfirmar);
    modal.appendChild(modalContent);
    modal.style.display = "block";

    imgFecharModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    btnConfirmar.addEventListener("click", async () => {
      try {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: "",
        };
        const response = await fetch(
          `http://localhost:3000/api/categories/${d.id}`,
          requestOptions
        );

        modal.style.display = "none";
        document.getElementById(d.id).remove();
      } catch (error) {}
    });

    return document.body.appendChild(modal);
  }
}

const deleteModal = new DeleteModal();
export default deleteModal;
