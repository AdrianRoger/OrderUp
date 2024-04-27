import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle('Admin Initial');
  }

  async getHtml() {
    const body = document.body;
    const div = document.createElement('div');
    const adminButton = document.createElement('button');
    const openTableButton = document.createElement('button');

    adminButton.innerText = "Admnistração";
    openTableButton.innerText = "Abertura de mesas";

    body.classList.add('admin-page-body');
    div.classList.add('admin-page-container');
    adminButton.classList.add('admin-page-button');
    openTableButton.classList.add('admin-page-button');

    body.appendChild(div);
    div.appendChild(adminButton);
    div.appendChild(openTableButton);

    return body;
  }
}