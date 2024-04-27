import AbastractPage from "./AbastractPage.js";

export default class extends AbastractPage {
  constructor() {
    super();
    this.setTitle('Categories');
  }

  async getHtml() {
    const categories = document.createElement('div');
   //categories.classList.add('login-box');

     const header = new Headers();
        header.append("Content-Type", "application/json");
   
   const content = JSON.stringify({
     "organization_id": "a7930dec-36ea-4a8d-998e-be326acfddf6"
   });
   console.log(content);
   const requestOptions = {
     method: "GET",
     headers: header,
     body: content,
     redirect: "follow"
   };
   
   fetch("http://192.168.1.110:3000/categories/", requestOptions)
     .then((response) => response.text())
     .then((result) => {
        const category = document.createElement('div');
        category.classList.add('category-box');
        const id = document.createElement('h2');
        id.innerText = result.id;
        const name = document.createElement('h2');
        id.innerText = result.name;
        const description = document.createElement('h2');
        id.innerText = result.description;
        // 2 buttons aqui
        category.appendChild(id);
        category.appendChild(name);
        category.appendChild(description);
        categories.appendChild(category);
        //console.log(result);
    })
     .catch((error) => console.error(error));


 
    // let input = document.createElement('input');
    // input.type = 'text';
    // input.name = 'username'
    // input.required = true;

    // let label = document.createElement('label');
    // label.innerHTML = 'Username';

    // div.appendChild(input);
    // div.appendChild(label);

    // form.appendChild(div);

    // div = document.createElement('div');
    // div.classList.add('user-box');

    // input = document.createElement('input');
    // input.type = 'password';
    // input.name = 'password';
    // input.required = true;

    // label = document.createElement('label');
    // label.innerHTML = 'Password';

    // div.appendChild(input);
    // div.appendChild(label);

    // form.appendChild(div);
    // form.addEventListener('submit', async (event) => {
    //   event.preventDefault();
    //   const username = form.username.value;
    //   const password = form.password.value;
    //   const response = await fetch('/api/login/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });
    //   const data = await response.json();
    //   if (data.error) {
    //     alert(data.error);
    //     document.cookie = "";
    //   } else {
    //     window.location.href = '/client';
    //   }
    // });

    // const button = document.createElement('button');
    // button.type = 'submit';
    // // a.addEventListener('click', function (e) {
    // //   e.preventDefault(); // Impede o comportamento padrão de redirecionamento do link
    // //   const form = this.closest('form'); // Encontra o formulário mais próximo
    // //   if (form) {
    // //     form.submit(); // Envia o formulário
    // //   }
    // // });
    // button.innerHTML = `SEND <span></span>`;

    // form.appendChild(button);
    // login.appendChild(form);

    return categories;
  }

}