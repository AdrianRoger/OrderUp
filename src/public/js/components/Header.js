class Header extends HTMLElement {
  constructor() {
    super();
    this.classList.add("header");
    this.innerText = "OrderUp";
  }
}

customElements.define("my-header", Header);

const header = new Header();
export default header;
