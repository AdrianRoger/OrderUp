import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Login");
  }

  async getHtml() {
    const page = document.createElement('section');

    const divRight = document.createElement('div');
    const divLeft = document.createElement('div');

    divLeft.style.backgroundColor = 'white'
    divRight.style.background = 'linear-gradient(to right, #F62913, #90180B)';

    page.appendChild(divLeft);
    page.appendChild(divRight);

    return page;
  }
}