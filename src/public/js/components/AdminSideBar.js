import DeviceList from "../pages/DeviceList.js";

const deviceList = new DeviceList();

const itemsList = [
  {
    name: 'Listas',
    items: [
      { name: 'Lista de Dispositivos', urlImage: './img/icons/device.svg', action: deviceList.getHtml() },
      { name: 'Lista de Produtos', urlImage: './img/icons/product.svg', action: '' },
      { name: 'Lista de Categorias', urlImage: './img/icons/fi-bs-label.svg', action: '' },
    ]
  },
  {
    name: 'Cadastro',
    items: [
      { name: 'Dispositivos', urlImage: './img/icons/fi-bs-notebook.svg', action: '' },
      { name: 'Produtos', urlImage: './img/icons/fi-bs-notebook.svg', action: '' },
      { name: 'Categorias', urlImage: './img/icons/fi-bs-notebook.svg', action: '' },
    ]
  },
]

export default class AdminSideBar {
  #changePassword() {
    alert('você clicou para mudar o password');
    const dropdown = document.querySelector('.dropdown')
    dropdown.classList.remove('active');
  }

  getSideBar() {
    const sideBar = document.createElement('div');
    sideBar.classList.add('admin-sidebar');
    sideBar.classList.add('sidebar-to-left');

    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');

    const span = document.createElement('span');

    const imgHamburger = document.createElement('img');
    imgHamburger.src = './img/icons/fi-bs-menu-burger.svg';
    span.appendChild(imgHamburger);

    const closeSpan = document.createElement('span');
    const imgCloseHamburger = document.createElement('img');
    imgCloseHamburger.src = './img/icons/fi-br-cross.svg';
    closeSpan.appendChild(imgCloseHamburger);
    closeSpan.classList.add('hidden');

    hamburger.addEventListener('click', () => {
      sideBar.classList.toggle('sidebar-to-right');
      sideBar.classList.toggle('sidebar-to-left');
    });

    hamburger.appendChild(span);
    hamburger.appendChild(closeSpan);

    hamburger.addEventListener('click', () => {
      span.classList.toggle('hidden');
      closeSpan.classList.toggle('hidden');
    });

    let childConteiner = document.createElement('div');
    childConteiner.classList.add('person');

    const person = document.createElement('div');
    person.classList.add('person-img');
    const imgPerson = document.createElement('img');
    imgPerson.src = './img/icons/fi-bs-user.svg';
    person.appendChild(imgPerson);

    const administrator = document.createElement('span');
    administrator.innerText = 'Administrador';

    //Edit password dropdown
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const dropdownTrigger = document.createElement('div');
    dropdownTrigger.classList.add('dropdown-trigger');
    dropdown.appendChild(dropdownTrigger);

    const dropdownIcon = document.createElement('img');
    dropdownIcon.src = './img/icons/fi-br-menu-dots-vertical.svg';
    dropdownIcon.alt = 'Menu';
    dropdownIcon.classList.add('dropdown-icon');
    dropdownTrigger.appendChild(dropdownIcon);

    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');
    dropdownContent.id = 'dropdownContent';
    dropdown.appendChild(dropdownContent);

    const dropdownItem = document.createElement('span');
    dropdownItem.classList.add('dropdown-item');
    dropdownItem.innerText = 'Alterar senha';

    dropdownContent.appendChild(dropdownItem);

    dropdownTrigger.addEventListener('click', function () {
      // dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
      const dropdown = document.querySelector('.dropdown');
      const clicouDentroDropdownContent = dropdown.contains(event.target);

      // Se o clique não foi dentro do dropdown, fecha o dropdown
      if (!clicouDentroDropdownContent) {
        dropdown.classList.remove('active');
      }
    });

    dropdownItem.addEventListener('click', this.#changePassword);

    //ajustar a classe e adicionar a lógica para o psseudo-elemento ::after aqui

    childConteiner.appendChild(person);
    childConteiner.appendChild(administrator);
    childConteiner.appendChild(dropdown);


    sideBar.appendChild(childConteiner);

    itemsList.forEach(list => {
      childConteiner = document.createElement('div');
      childConteiner.classList.add('sidebar-list-container');

      const titleList = document.createElement('h3');
      titleList.innerText = `${list.name}`;
      titleList.classList.add('sidebar-title-list');

      childConteiner.appendChild(titleList);

      const ul = document.createElement('ul');

      list.items.forEach(listItem => {
        const li = document.createElement('li');
        li.classList.add('sidebar-item');

        const span = document.createElement('span');
        span.classList.add('sidebar-item-img');
        span.innerHTML = `<img src="${listItem.urlImage}" alt=''></img>`;

        li.addEventListener('click', async () => {
          const selected = sideBar.querySelector('.li-selected');
          if (selected) {
            selected.classList.remove('li-selected');
          }
          //lógica para o container #admin-root
          li.classList.add('li-selected');

          const adminRoot = document.getElementById('admin-root');
          adminRoot.innerHTML = '';
          adminRoot.appendChild(await listItem.action);
        })

        li.appendChild(span);

        const text = document.createElement('p');
        text.classList.add('sidebar-item-text');
        text.innerText = `${listItem.name}`;
        li.appendChild(text);

        ul.appendChild(li);
      });
      childConteiner.appendChild(ul);
      sideBar.appendChild(childConteiner);
    });

    const logout = document.createElement('button');
    logout.classList.add('sidebar-logout');

    const imgLogoutSpan = document.createElement('span');
    imgLogoutSpan.classList.add('img-logout-span');

    const imgLogout = document.createElement('img');
    imgLogout.src = './img/icons/fi-bs-upload.svg';
    imgLogoutSpan.appendChild(imgLogout);

    logout.appendChild(imgLogoutSpan);

    const logoutText = document.createElement('span');
    logoutText.innerText = 'Sair';

    logout.appendChild(logoutText);
    logout.addEventListener('click', async () => {
      try {
        const result = await fetch('/api/login/exit');

        if (result.status === 200) {
          window.location = '/login';
        }

      } catch (error) {
        console.log('Error: ', error);
      }
    });

    sideBar.appendChild(logout)
    sideBar.appendChild(hamburger);
    return sideBar
  }
}