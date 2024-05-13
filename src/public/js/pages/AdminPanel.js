import AbstractPage from "./AbstractPage.js";
import AdminSideBar from '../components/AdminSideBar.js';

export default class extends AbstractPage{
  constructor(){
    super();
    this.setTitle('Admin OrderUp');
  };

  getHtml(){
    const admin = document.createElement('div');
    admin.classList.add('admin-container', 'mt-50');

    const adminSideBar = new AdminSideBar();
    admin.appendChild(adminSideBar.getSideBar());

    const adminRootContainer = document.createElement('div');
    adminRootContainer.id = 'admin-root';
    adminRootContainer.innerHTML = "Bem vindo";
    admin.appendChild(adminRootContainer);    

    return admin;
  }
}
