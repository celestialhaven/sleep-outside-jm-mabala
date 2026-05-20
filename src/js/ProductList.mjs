export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products =
      await this.dataSource.getData();

    this.renderList(products);
  }

  renderList(products) {
    const html = products.map(
      (product) =>
        this.productTemplate(product)
    );

    this.listElement.innerHTML =
      html.join("");
  }

  productTemplate(product) {
    return `
      <li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
          
          <img
            src="${product.Image}"
            alt="${product.Name}"
          />

          <h3 class="card__brand">
            ${product.Brand.Name}
          </h3>

          <h2 class="card__name">
            ${product.NameWithoutBrand}
          </h2>

          <p class="product-card__price">
            $${product.FinalPrice}
          </p>

        </a>
      </li>
    `;
  }
}