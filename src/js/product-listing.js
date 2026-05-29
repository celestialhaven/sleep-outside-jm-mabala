import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage, getParam, loadHeaderFooter } from "./utils.mjs";

const alert = new Alert();

alert.render();

const category = getParam("category");

const categoryElement = document.getElementById("product-category");

if (categoryElement) {
  categoryElement.textContent = category
    .replace("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const dataSource = new ProductData(category);

const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);

function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];

  const count = cartItems.length;

  const cartCount = document.querySelector(".cart-count");

  if (!cartCount) return;

  if (count > 0) {
    cartCount.textContent = count;

    cartCount.style.display = "flex";
  } else {
    cartCount.style.display = "none";
  }
}

async function init() {
  await loadHeaderFooter();

  updateCartCount();

  await myList.init();
}

init();
