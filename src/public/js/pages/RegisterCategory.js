import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle('Register Category');
  }

  async getHtml() {
    const body = document.createElement('div');
    const div = document.createElement('div');
    const registerCategoryForm = document.createElement('form');
    const inputNameCategoryLabel = document.createElement('label');
    const inputNameCategory = document.createElement('input');
    const inputDescriptionCategoryLabel = document.createElement('label');
    const inputDescriptionCategory = document.createElement('textarea');
    const registerCategoryButton = document.createElement('button');
    const divNameInput = document.createElement('div');
    const divDescriptionInput = document.createElement('div');

    inputNameCategoryLabel.innerText = "Nome: ";
    inputDescriptionCategoryLabel.innerText = "Descrição: ";
    registerCategoryButton.innerText = "Cadastrar";

    body.classList.add('register-category-page-body');
    div.classList.add('register-category-page-container');
    registerCategoryForm.classList.add('register-category-page-form');
    divNameInput.classList.add('input-group-bg-blue');
    divDescriptionInput.classList.add('input-group-bg-blue');
    inputNameCategoryLabel.classList.add('register-category-page-name-label');
    inputNameCategory.classList.add('register-category-page-input-name');
    inputDescriptionCategoryLabel.classList.add('register-category-page-description-label');
    inputDescriptionCategory.classList.add('register-category-page-input-description');
    registerCategoryButton.classList.add('register-category-page-button-register');

    registerCategoryForm.appendChild(divNameInput);
    divNameInput.appendChild(inputNameCategoryLabel);
    divNameInput.appendChild(inputNameCategory);

    registerCategoryForm.appendChild(divDescriptionInput);
    divDescriptionInput.appendChild(inputDescriptionCategoryLabel);
    divDescriptionInput.appendChild(inputDescriptionCategory);
    registerCategoryForm.appendChild(registerCategoryButton);

    div.appendChild(registerCategoryForm);
    body.appendChild(div);

    return body;
  }
}