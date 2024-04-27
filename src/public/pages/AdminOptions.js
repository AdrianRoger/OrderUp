import AbastractPage from "./AbastractPage.js";

export default class extends AbastractPage {
  constructor() {
    super();
    this.setTitle('Admin Options');
  }

  async getHtml() {
    const body = document.body;
    const header = document.createElement('header');
    const div = document.createElement('div');
    const buttonRegisterProduct = document.createElement('button');
    const buttonListProduct = document.createElement('button');
    const buttonRegisterCategory = document.createElement('button');
    const buttonListCategory = document.createElement('button');

    buttonRegisterProduct.innerText = "Cadastrar Produtos";
    buttonListProduct.innerText = "Listar Produtos";
    buttonRegisterCategory.innerText = "Cadastrar Categoria";
    buttonListCategory.innerText = "Listar Categorias";

    body.classList.add('admin-products-page-body');
    header.classList.add('admin-products-page-header');
    div.classList.add('admin-products-page-container');
    buttonRegisterProduct.classList.add('admin-products-page-button');
    buttonListProduct.classList.add('admin-products-page-button');
    buttonRegisterCategory.classList.add('admin-products-page-button');
    buttonListCategory.classList.add('admin-products-page-button');

    div.appendChild(buttonRegisterProduct);
    div.appendChild(buttonListProduct);
    div.appendChild(buttonRegisterCategory);
    div.appendChild(buttonListCategory);
    body.appendChild(header);
    body.appendChild(div);

    return body;
  }
}