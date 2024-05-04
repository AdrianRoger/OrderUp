import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Login");
  }

  async getHtml() {
    const login = document.createElement("div");
    login.classList.add("login-box");

    const selectTypeConteiner = document.createElement("div");
    selectTypeConteiner.classList.add("mydict");

    const selectTypeDiv = document.createElement("div");
    const selectAdminLabel = document.createElement("label");
    selectAdminLabel.htmlFor = "inputAdmin";
    const inputTypeAdmin = document.createElement("input");
    inputTypeAdmin.id = "inputAdmin";
    inputTypeAdmin.type = "radio";
    inputTypeAdmin.name = "radio";
    inputTypeAdmin.checked = true;
    
    const spanTypeAdmin = document.createElement("span");
    spanTypeAdmin.innerText = "Admin";

    const selectDeviceLabel = document.createElement("label");
    selectDeviceLabel.htmlFor = "inputDevice";
    const inputTypeDevice = document.createElement("input");
    inputTypeDevice.id = "inputDevice";
    inputTypeDevice.type = "radio";
    inputTypeDevice.name = "radio";

    const spanTypeDevice = document.createElement("span");
    spanTypeDevice.innerText = "Device";

    selectAdminLabel.appendChild(inputTypeAdmin);
    selectAdminLabel.appendChild(spanTypeAdmin);
    selectTypeDiv.appendChild(selectAdminLabel);
    selectDeviceLabel.appendChild(inputTypeDevice);
    selectDeviceLabel.appendChild(spanTypeDevice);
    selectTypeDiv.appendChild(selectDeviceLabel);
    selectTypeConteiner.appendChild(selectTypeDiv);

    const form = document.createElement("form");
    form.id = "loginForm";
    form.method = "POST";
    form.action = "/api/login";

    const nameBox = document.createElement("div");
    nameBox.classList.add("name-box");

    const nameLabel = document.createElement("label");
    nameLabel.innerText = "Usuário: ";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "username"
    nameInput.required = true;

    const passwordBox = document.createElement("div");
    passwordBox.classList.add("password-box");

    const passwordLabel = document.createElement("label");
    passwordLabel.innerText = "Senha: ";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password"
    passwordInput.required = true;
  
    const sendButton = document.createElement("button");
    sendButton.type = "submit";
    sendButton.textContent = "Enviar";

    nameBox.appendChild(nameLabel);
    nameBox.appendChild(nameInput);
    form.appendChild(nameBox);

    passwordBox.appendChild(passwordLabel);
    passwordBox.appendChild(passwordInput);
    form.appendChild(passwordBox);

    form.appendChild(sendButton);

    login.appendChild(selectTypeConteiner);
    login.appendChild(form);


    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const username = nameInput.value;
      const password = passwordInput.value;

      if (inputTypeAdmin.checked) {
        const type = "admin";
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, username, password })
        });
        
        const data = response.json();

        if (data.type === "admin") {
          window.location.href = "/admin-page";
        } else {
          console.error("Falha ao enviar os dados para o backend (colocar exception aqui)")
        }

      } else {
        const type = "device";
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, username, password })
        }); 

        const data = await response.json();

        if (response.ok) {
          switch (data.device_type) {
            case "cozinha":
              window.location.href = "/cozinha";
              break;
            case "balcao":
              window.location.href = "/balcao";
              break;
            case "mesa":
              window.location.href = "/mesa";
              break;
          }
        } else {
          console.error("Falha ao enviar os dados para o backend ()");
        }
      }
    })
    return login;
  }
}