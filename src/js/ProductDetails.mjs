export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }

  async init() {

    const product =
      await this.dataSource.findProductById(
        this.productId
      );

    if (!product) {

      document.querySelector(
        ".product-detail"
      ).innerHTML =
        "<p>Product not found.</p>";

      return;
    }

    this.renderProductDetails(product);

  }

  renderProductDetails(product) {
  const productSection =
    document.querySelector(
      ".product-detail"
    );

  productSection.innerHTML = `
  
    <div class="product-detail__top">

      <img
        class="product-detail__image"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />

      <div class="product-detail__info">

        <img
          class="product-brand__logo"
          src="${product.Brand.LogoSrc}"
          alt="${product.Brand.Name}"
        />

        <h3>
          ${product.Brand.Name}
        </h3>

        <h2 class="divider">
          ${product.NameWithoutBrand}
        </h2>

        <p class="product-id">
          Product ID:
          ${product.Id}
        </p>

        <div class="product-pricing">

          <p class="product-card__price">
            $${product.FinalPrice}
          </p>

          <p class="product-suggested-price">
            Suggested Retail:
            <span>
              $${product.SuggestedRetailPrice}
            </span>
          </p>

        </div>

        <div class="product-colors">

          <h4>Available Colors</h4>

          ${product.Colors.map(
            (color) => `
              <p>
                ${color.ColorName}
              </p>
            `
          ).join("")}

        </div>

        <div class="product-sizes">

          <h4>Sizes Available</h4>

          <p>
            ${
              Object.keys(
                product.SizesAvailable
              ).length > 0
                ? Object.keys(
                    product.SizesAvailable
                  ).join(", ")
                : "Standard Size"
            }
          </p>

        </div>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">

          <button
            id="addToCart"
            data-id="${product.Id}"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  `;
}
}