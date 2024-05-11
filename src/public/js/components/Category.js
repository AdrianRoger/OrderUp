class Category{
    async create(){
        const modal = document.createElement("div");
        modal.id = "modal-form";
        modal.classList.add("modal");
        
        const background = document.createElement("div");
        background.classList.add("background");
        modal.appendChild(background);
        
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
       
        const fecharModal = document.createElement("p");
        fecharModal.classList.add("modal-close");
        fecharModal.innerText = "X";
        
        const title = document.createElement("h3");
        title.id = "title-modal";
        title.innerText = "Cadastro de Categoria";
       
        const form = document.createElement("form");
        form.id = "form-update";
       
        const inputName = document.createElement("input");
        inputName.name = "name";
        inputName.placeholder = "Nome";
        
        const txtDescription = document.createElement("textarea");
        txtDescription.name = "description";
        txtDescription.placeholder = "Descrição";
        txtDescription.rows = 4;
        txtDescription.cols = 30;
       
        const btnConfirmar = document.createElement("button");
        btnConfirmar.innerText = "Confirmar";
        btnConfirmar.classList.add("modal-button");
       
        form.appendChild(inputName);
        form.appendChild(txtDescription);
        modalContent.appendChild(fecharModal);
        modalContent.appendChild(title);
        modalContent.appendChild(form);
        modalContent.appendChild(btnConfirmar);
        modal.appendChild(modalContent);
        modal.style.display = "block";
    
        fecharModal.addEventListener("click", () => {
          modal.style.display = "none";
        });
    
        btnConfirmar.addEventListener("click", async () => {
          try {
            const requestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "orgId":"a7930dec-36ea-4a8d-998e-be326acfddf6",
                "name": inputName.value,
                "description": txtDescription.value,
              }),
            };
             await fetch(
              `http://localhost:3000/api/categories/`,
              requestOptions
            );
    
            modal.style.display = "none";
            window.location.reload();
          } catch (error) {}
        });
    
        return document.body.appendChild(modal);
      }

      async update(d){
        const modal = document.createElement("div");
        modal.id = "modal-form";
        modal.classList.add("modal");
        
        const background = document.createElement("div");
        background.classList.add("background");
        modal.appendChild(background);
        
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
       
        const fecharModal = document.createElement("p");
        fecharModal.classList.add("modal-close");
        fecharModal.innerText = "X";
        
        const title = document.createElement("h3");
        title.id = "title-modal";
        title.innerText = "Atulização de Categoria";
        
        const form = document.createElement("form");
        form.id = "form-update";
        
        const inputName = document.createElement("input");
        inputName.name = "name";
        inputName.placeholder = "Nome";
        inputName.value = document.getElementById(d.name).innerText;
        
        const txtDescription = document.createElement("textarea");
        txtDescription.name = "description";
        txtDescription.placeholder = "Descrição";
        txtDescription.rows = 4;
        txtDescription.cols = 30;
        txtDescription.value = document.getElementById(d.description).innerText;
        
        const btnConfirmar = document.createElement("button");
        btnConfirmar.innerText = "Confirmar";
        btnConfirmar.classList.add("modal-button");
        
        form.appendChild(inputName);
        form.appendChild(txtDescription);
        modalContent.appendChild(fecharModal);
        modalContent.appendChild(title);
        modalContent.appendChild(form);
        modalContent.appendChild(btnConfirmar);
        modal.appendChild(modalContent);
        modal.style.display = "block";
      
        fecharModal.addEventListener("click", () => {
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
             await fetch(
              `http://localhost:3000/api/categories/${d.id}`,
              requestOptions
            );
    
            modal.style.display = "none";
            document.getElementById(d.name).innerText = inputName.value;
            document.getElementById(d.description).innerText = txtDescription.value;
            
          } catch (error) {}
        });
    
        return document.body.appendChild(modal);
      }
      
    }
    
    


const category = new Category();
export default category;