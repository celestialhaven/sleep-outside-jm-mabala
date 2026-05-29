export default class ProductList {

  constructor(
    category,
    dataSource,
    listElement
  ) {

    this.category =
      category;

    this.dataSource =
      dataSource;

    this.listElement =
      listElement;

  }

  async init() {

    const products =
      await this.dataSource.getData(
        this.category
      );

    this.renderList(
      products
    );

    this.renderBreadcrumb(
      products.length
    );

  }

  renderBreadcrumb(
    count
  ) {

    const breadcrumb =
      document.querySelector(
        ".breadcrumb"
      );

    if (!breadcrumb) return;

    const categoryName =
      this.category
        .charAt(0)
        .toUpperCase() +
      this.category.slice(1);

    breadcrumb.innerHTML = `
      <strong>
        ${categoryName}
      </strong>
      →
      (${count} items)
    `;

  }

  renderList(
    products
  ) {

    const html =
      products.map(
        (product) =>
          this.productTemplate(
            product
          )
      );

    this.listElement.innerHTML =
      html.join("");

  }

  productTemplate(
    product
  ) {

    const isDiscounted =
      product.FinalPrice <
      product.SuggestedRetailPrice;

    let discountPercent = 0;

    if (isDiscounted) {

      discountPercent =
        Math.round(
          (
            (
              product.SuggestedRetailPrice -
              product.FinalPrice
            ) /
            product.SuggestedRetailPrice
          ) * 100
        );

    }

    return `
      <li class="product-card">

        ${
          isDiscounted
            ? `
              <span class="discount-badge">
                ${discountPercent}% OFF
              </span>
            `
            : ""
        }

        <a
          href="../product_pages/index.html?category=${this.category}&product=${product.Id}"
        >

          <img
            src="${product.Images.PrimaryMedium}"
            alt="${product.NameWithoutBrand}"
          />

          <h3 class="card__brand">
            ${product.Brand.Name}
          </h3>

          <h2 class="card__name">
            ${product.NameWithoutBrand}
          </h2>

          <div class="product-card__pricing">

            ${
              isDiscounted
                ? `
                  <span class="original-price">
                    $${product.SuggestedRetailPrice}
                  </span>
                `
                : ""
            }

            <p class="product-card__price">
              $${product.FinalPrice}
            </p>

          </div>

        </a>

      </li>
    `;

  }

}