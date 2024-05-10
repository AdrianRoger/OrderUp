import AbstractPage from "../pages/AbstractPage.js";

class DeleteModal extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Delete");
  }

  async getHtml(d) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const background = document.createElement("div");
    background.classList.add("background");
    modal.appendChild(background);
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    const fecharModal = document.createElement("p");
    fecharModal.classList.add("modal-close");
    fecharModal.innerText = "X";
    const question = document.createElement("p");
    question.id = "question";
    question.classList.add("modal-text");
    question.innerHTML = `<span id="important">Importante!</span><p>Tem certeza que deseja excluir o item ${document.getElementById(d.name).innerText}?</p>`;
    const btnConfirmar = document.createElement("button");
    btnConfirmar.innerText = "Confirmar";
    btnConfirmar.classList.add("modal-button");
    modalContent.appendChild(fecharModal);
    modalContent.appendChild(question);
    modalContent.appendChild(btnConfirmar);
    modal.appendChild(modalContent);
    modal.style.display = "block";

    fecharModal.addEventListener("click", () => {
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
         await fetch(
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
