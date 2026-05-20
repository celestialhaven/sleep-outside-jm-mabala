import {
  getParam,
  setLocalStorage
} from "./utils.mjs";

import ProductData from "./ProductData.mjs";

import ProductDetails from "./ProductDetails.mjs";

const productId =
  getParam("product");

console.log(
  "PRODUCT ID:",
  productId
);

const dataSource =
  new ProductData("tents");

const product =
  new ProductDetails(
    productId,
    dataSource
  );

product.init();

// ADD TO CART
function addProductToCart(product) {
  setLocalStorage(
    "so-cart",
    product
  );
}

// BUTTON HANDLER
async function addToCartHandler(e) {
  const id =
    e.currentTarget.dataset.id;

  console.log(
    "BUTTON ID:",
    id
  );

  const product =
    await dataSource.findProductById(
      id
    );

  console.log(
    "FOUND PRODUCT:",
    product
  );

  if (!product) {
    console.error(
      "Product not found"
    );

    return;
  }

  addProductToCart(product);

  console.log(
    "LOCAL STORAGE:",
    localStorage.getItem(
      "so-cart"
    )
  );
}

// IMPORTANT
document.addEventListener(
  "click",
  (e) => {
    if (
      e.target &&
      e.target.id === "addToCart"
    ) {
      addToCartHandler(e);
    }
  }
);