import { getParam, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

import ProductData from "./ProductData.mjs";

import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");

const category =
  getParam("category");

console.log("CATEGORY:", category);
console.log("PRODUCT ID:", productId);


const dataSource =
  new ProductData(category);

const productDetails = new ProductDetails(productId, dataSource);

// UPDATE CART BADGE
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  const cartCount = document.querySelector(".cart-count");

  if (!cartCount) return;

  const totalItems = cartItems.length;

  cartCount.textContent = totalItems;

  // SHOW ONLY IF 1+
  if (totalItems > 0) {
    cartCount.style.display = "flex";
  } else {
    cartCount.style.display = "none";
  }
}

// INIT PAGE
async function init() {

  await loadHeaderFooter();

  await productDetails.init();

  updateCartCount();

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
function addProductToCart(cartProduct) {
  setLocalStorage("so-cart", cartProduct);

  // REFRESH BADGE
  updateCartCount();
}

// BUTTON HANDLER
async function addToCartHandler(e) {
  const id = e.target.dataset.id;

  console.log("BUTTON ID:", id);

  const foundProduct = await dataSource.findProductById(id);

  console.log("FOUND PRODUCT:", foundProduct);

  if (!foundProduct) {
    console.error("Product not found");

    return;
  }

  addProductToCart(foundProduct);

  console.log("CART:", localStorage.getItem("so-cart"));

  alert("Product added to cart!");
}
