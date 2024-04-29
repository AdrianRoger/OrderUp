import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle("Register Product");
  }

  async getHtml() {
    const body = document.createElement("div");
    const registerProduct = document.createElement("div");
    registerProduct.classList.add("register-product-box");

    const form = document.createElement("form");
    form.id = "registerProductForm";
    form.method = "POST";
    form.action = "/api/product";
    form.enctype = "multipart/form-data";

    const titleBox = document.createElement("div");
    titleBox.classList.add("title-box");

    const titleLabel = document.createElement("label");
    titleLabel.innerText = "Título: ";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.required = true;

    const descriptionBox = document.createElement("div");
    descriptionBox.classList.add("description-box");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = "Descrição: ";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.name = "description";
    descriptionInput.required = true;

    const valueBox = document.createElement("div");
    valueBox.classList.add("value-box");

    const valueLabel = document.createElement("label");
    valueLabel.innerText = "Valor: ";

    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.name = "value";
    valueInput.required = true;

    const categoryBox = document.createElement("div");
    categoryBox.classList.add("category-box");

    const categoryLabel = document.createElement("label");
    categoryLabel.innerText = "Categoria: ";

    const categorySelect = document.createElement("select");
    categorySelect.name = "categoryId";
    categorySelect.required = true;

    // const response = await fetch("/api/categories/");
    // const data = await response.json();
    // console.log(data);
    // Aqui é onde alimenta o select

    const categories = ["Categoria 1", "Categoria 2", "Categoria 3"];
    categories.forEach(category => {
      const option = document.createElement("option");
      option.text = category.name;
      option.value = category.id;
      categorySelect.add(option);
    });

    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    const imageLabel = document.createElement("label");
    imageLabel.innerText = "Imagem: ";

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.name = "image";
    imageInput.accept = "image/*";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Enviar";

    titleBox.appendChild(titleLabel);
    titleBox.appendChild(titleInput);
    form.appendChild(titleBox);

    descriptionBox.appendChild(descriptionLabel);
    descriptionBox.appendChild(descriptionInput);
    form.appendChild(descriptionBox);

    valueBox.appendChild(valueLabel);
    valueBox.appendChild(valueInput);
    form.appendChild(valueBox);

    categoryBox.appendChild(categoryLabel);
    categoryBox.appendChild(categorySelect);
    form.appendChild(categoryBox);

    imageBox.appendChild(imageLabel);
    imageBox.appendChild(imageInput);
    form.appendChild(imageBox);

    form.appendChild(submitButton);

    registerProduct.appendChild(form);
    body.appendChild(registerProduct);

    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const title = titleInput.value;
      const description = descriptionInput.value;
      const value = valueInput.value;
      const category = categorySelect.value;
    
      // Ajustar a requisição para upload de imagem
      const response = fetch("/api/product", {
        method: "POST",
        header: "Content-Type, application/json",
        body: JSON.stringify({ title, description, value, category })
      });

      const data = response.json();

    })
    return body;
  }
}
