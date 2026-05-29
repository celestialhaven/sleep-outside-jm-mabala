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

    this.products = [];

  }

  async init() {

    this.products =
      await this.dataSource.getData(
        this.category
      );

    this.renderList(
      this.products
    );

    this.renderBreadcrumb(
      this.products.length
    );

    this.initSorting();

  }

  initSorting() {

    const sortSelect =
      document.querySelector(
        "#sortProducts"
      );

    if (!sortSelect) return;

    sortSelect.addEventListener(
      "change",
      (e) => {

        const value =
          e.target.value;

        const sorted =
          [...this.products];

        switch (value) {

          case "name-asc":

            sorted.sort(
              (a, b) =>
                a.NameWithoutBrand.localeCompare(
                  b.NameWithoutBrand
                )
            );

            break;

          case "name-desc":

            sorted.sort(
              (a, b) =>
                b.NameWithoutBrand.localeCompare(
                  a.NameWithoutBrand
                )
            );

            break;

          case "price-low":

            sorted.sort(
              (a, b) =>
                a.FinalPrice -
                b.FinalPrice
            );

            break;

          case "price-high":

            sorted.sort(
              (a, b) =>
                b.FinalPrice -
                a.FinalPrice
            );

            break;

        }

        this.renderList(
          sorted
        );

      }
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
        .split("-")
        .map(
          (word) =>
            word.charAt(0)
              .toUpperCase() +
            word.slice(1)
        )
        .join(" ");

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