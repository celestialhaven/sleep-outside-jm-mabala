import {
  getParam,
  setLocalStorage
} from "./utils.mjs";

import ProductData from "./ProductData.mjs";

import ProductDetails from "./ProductDetails.mjs";

const productId =
  getParam("product");

const dataSource =
  new ProductData("tents");

const product =
  new ProductDetails(
    productId,
    dataSource
  );

// INIT PAGE
async function init() {
  await product.init();

  // WAIT until button exists
  const addButton =
    document.getElementById(
      "addToCart"
    );

  if (addButton) {
    addButton.addEventListener(
      "click",
      addToCartHandler
    );
  }
}

init();

// ADD PRODUCT TO STORAGE
function addProductToCart(product) {
  setLocalStorage(
    "so-cart",
    product
  );
}

// BUTTON HANDLER
async function addToCartHandler(e) {
  const id =
    e.target.dataset.id;

  console.log(
    "BUTTON ID:",
    id
  );

  const foundProduct =
    await dataSource.findProductById(
      id
    );

  console.log(
    "FOUND PRODUCT:",
    foundProduct
  );

  if (!foundProduct) {
    console.error(
      "Product not found"
    );

    return;
  }

  addProductToCart(foundProduct);

  console.log(
    "CART:",
    localStorage.getItem(
      "so-cart"
    )
  );

  alert("Product added to cart!");
}