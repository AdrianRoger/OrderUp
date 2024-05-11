class Header extends HTMLElement {
  constructor() {
    super();
    this.createHeader();
  }

  createHeader(){
    this.classList.add('header');

    const div = document.createElement('div');
    div.classList.add('logo-header');

    const img = document.createElement('img');
    img.classList.add('logo-img');
    img.src = './img/orderup-logo-black.png';
    img.alt = 'Logotipo OrderUp';

    const span = document.createElement('span');
    span.classList.add('logo-name');
    span.innerText = 'OrderUp';

    div.appendChild(img);
    div.appendChild(span);

    this.appendChild(div);
  }
}

customElements.define("my-header", Header);

const header = new Header();
export default header;
