import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage } from "./utils.mjs";

const alert = new Alert();

alert.render();

const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const myList = new ProductList("tents", dataSource, listElement);

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

updateCartCount();

myList.init();
