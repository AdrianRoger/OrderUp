class Device{
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
        title.innerText = "Cadastro de Dispositivos";
        
        const form = document.createElement("form");
        form.id = "form-update";
        
        const inputName = document.createElement("input");
        inputName.name = "name";
        inputName.placeholder = "Nome";
        
        const selectType = document.createElement("select");
        selectType.name = "type";
        selectType.placeholder = "Tipo";
        const opcoes = ['mesa', 'cozinha', 'balcao'];
        opcoes.forEach((opcao) => {
            const option = document.createElement('option');
            option.value = opcao.toLowerCase(); 
            option.textContent = opcao;
            selectType.appendChild(option);
        });
        const btnConfirmar = document.createElement("button");
        btnConfirmar.innerText = "Confirmar";
        btnConfirmar.classList.add("modal-button");
        
        form.appendChild(inputName);
        form.appendChild(selectType);
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
                "organizationId":"a7930dec-36ea-4a8d-998e-be326acfddf6",
                "name": inputName.value,
                "type": selectType.value,
              }),
            };
             await fetch(
              `http://localhost:3000/api/device/`,
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
                "type": txtDescription.value,
              }),
            };
             await fetch(
              `http://localhost:3000/api/device/${d.id}`,
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
    
    


const device = new Device();
export default device;