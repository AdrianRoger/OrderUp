class Header extends HTMLElement {
  constructor() {
    super();
    this.classList.add("header");
    this.innerText = "OrderUp";
    this.style.width = "100%"
  }
}

customElements.define("my-header", Header);

const header = new Header();
export default header;
