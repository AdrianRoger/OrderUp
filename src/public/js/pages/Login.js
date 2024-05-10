import AbstractPage from "./AbstractPage.js";


export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Login");
  }

  getHtml() {
    const page = document.createElement('div');
    page.classList.add('page');

    const modalMessage = document.createElement('div');
    modalMessage.classList.add('msg-modal');

    const msg = document.createElement('p');
    msg.classList.add('msg-modal-text');

    modalMessage.appendChild(msg);
    page.appendChild(modalMessage);

    const container = document.createElement('div');
    container.classList.add('container');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-hero');
    const img = document.createElement('img');
    img.src = './img/Hero_OrderUp.jpg';
    imgContainer.appendChild(img);

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    const form = document.createElement('form');
    form.classList.add('form-login');
    form.method = 'POST';
    form.action = '/login';

    const divUsername = document.createElement('div');
    const inputUsername = document.createElement('input');
    inputUsername.type = 'text';
    inputUsername.name = 'username';
    inputUsername.placeholder = 'Email';
    inputUsername.required = true;

    divUsername.appendChild(inputUsername);

    const divGroupInputs = document.createElement('div');
    divGroupInputs.classList.add('group-inputs');

    divGroupInputs.appendChild(divUsername);

    const divPassword = document.createElement('div');
    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.name = 'password';
    inputPassword.placeholder = 'Senha';
    inputPassword.required = true;
    
    //Magic Eyes for password
    divPassword.appendChild(inputPassword);

    const spanOpenedEye = document.createElement('span');
    spanOpenedEye.classList.add('eyes');
    spanOpenedEye.innerHTML = 
    `<svg stroke="currentColor" viewBox="0 0 24 24" fill="none">
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
    </svg>`;

    const spanClosedEye = document.createElement('span');
    spanClosedEye.classList.add('eyes');
    spanClosedEye.classList.add('hidden');
    spanClosedEye.innerHTML = 
    spanClosedEye.innerHTML = 
    `<svg stroke="currentColor" viewBox="0 0 24 24" fill="none">
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
      <path d="M20 4L4 20" stroke="white" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"></path>
      <path d="M20 4L4 20" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
    </svg>`;

    spanOpenedEye.addEventListener('click', () =>{
      spanOpenedEye.classList.toggle('hidden');
      spanClosedEye.classList.toggle('hidden');
      inputPassword.type = 'text';
    });
    spanClosedEye.addEventListener('click', () =>{
      spanOpenedEye.classList.toggle('hidden');
      spanClosedEye.classList.toggle('hidden');
      inputPassword.type = 'password';
    });

    divPassword.appendChild(spanOpenedEye);
    divPassword.appendChild(spanClosedEye);

    divGroupInputs.appendChild(divPassword);

    const forgotPassword = document.createElement('a');
    forgotPassword.classList.add('forgot-password');
    forgotPassword.innerText = 'Esqueceu sua senha?';
    forgotPassword.setAttribute('data-link', '');
    forgotPassword.href = '#';
    divGroupInputs.appendChild(forgotPassword);


    const entrar = document.createElement('button');
    entrar.type = 'submit';
    entrar.innerText = 'Entrar';
    entrar.style.display = 'block';


    //Type selection button created last for the correct functioning of event listeners
    const radioGroup = document.createElement('div');
    radioGroup.classList.add('radio-inputs');

    const radioSelection = document.createElement('div');
    radioSelection.classList.add('selected-type');
    radioGroup.appendChild(radioSelection);

    //Button for admin
    let label = document.createElement('label');
    label.classList.add('radio');
    label.id = 'admin';
    label.addEventListener('click', () => {
      radioSelection.classList.remove('slide-to-right');
      radioSelection.classList.add('slide-to-left');
      container.classList.remove('bg-darkest-red');
      entrar.classList.remove('light-red');
      inputUsername.placeholder = 'Nome de usuário';
      inputPassword.placeholder = 'Senha';

      document.querySelector('.header').classList.remove('bg-darkest-red');
      document.querySelector('.logo-img').classList.remove('logo-img-red');
    });
    radioGroup.appendChild(label);

    let radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'type';
    radioInput.checked = true;
    radioInput.value = 'admin';
    label.appendChild(radioInput);

    let span = document.createElement('span');
    span.classList.add('user-type');
    span.innerText = 'Administrador';
    label.appendChild(span);

    //button for devices
    label = document.createElement('label');
    label.classList.add('radio');
    label.id = 'device';
    label.addEventListener('click', () => {
      radioSelection.classList.remove('slide-to-left');
      radioSelection.classList.add('slide-to-right');
      container.classList.add('bg-darkest-red');
      entrar.classList.add('light-red');
      inputUsername.placeholder = 'Login de Organização';
      inputPassword.placeholder = 'Código de acesso';

      document.querySelector('.header').classList.add('bg-darkest-red');
      document.querySelector('.logo-img').classList.add('logo-img-red');
    });
    radioGroup.appendChild(label);

    radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'type';
    radioInput.value = 'device';
    label.appendChild(radioInput);

    span = document.createElement('span');
    span.classList.add('user-type');
    span.innerText = 'Dispositivos';
    label.appendChild(span);
    //End Type Seletion Bottun 

    form.appendChild(radioGroup);
    form.appendChild(divGroupInputs);
    form.appendChild(entrar);

    //adicionar lógica do form aqui
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const username = inputUsername.value;
      const password = inputPassword.value;
      const type = form.querySelector('input[name="type"]:checked').value;
      
      if (type === 'admin') {
        const response = await fetch("/api/login/", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, username, password })
        });

        const data = await response.json();

        //Show error message on screen
        if(response.status !== 200){
          msg.innerText = data.message;
          modalMessage.classList.remove('hide-message');
          modalMessage.classList.add('show-message');
          modalMessage.classList.add('error');
          
          setTimeout(()=>{
            modalMessage.classList.remove('show-message');
            modalMessage.classList.add('hide-message');
          }, 5000);

          return
        }
        
        if (data['data'].user_type === "admin") {
          window.location.href = "/admin-page";
        } else {
          console.error(data);
        }

      } else if(type === 'device'){
        const response = await fetch("/api/login/", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, username, password })
        }); 

        const data = await response.json();

        //Show error message on screen
        if(response.status !== 200){
          msg.innerText = data.message;
          modalMessage.classList.remove('hide-message');
          modalMessage.classList.add('show-message');
          modalMessage.classList.add('error');
          
          setTimeout(()=>{
            modalMessage.classList.remove('show-message');
            modalMessage.classList.add('hide-message');
          }, 5000);

          return
        }

        if (response.ok) {
          switch (data['data'].device_type) {
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
          console.error(data);
        }
      }
    });

    formContainer.appendChild(form);
    container.appendChild(imgContainer);
    container.appendChild(formContainer);
    page.appendChild(container);

    return page;
  }
}