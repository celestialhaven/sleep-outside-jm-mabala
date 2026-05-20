import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const id = e.currentTarget.dataset.id;

  console.log("BUTTON ID:", id);

  const product =
    await dataSource.findProductById(id);

  console.log("FOUND PRODUCT:", product);

  if (!product) {
    console.error("Product not found");
    return;
  }

  addProductToCart(product);

  console.log(
    "LOCAL STORAGE:",
    localStorage.getItem("so-cart")
  );
}

// add listener to Add to Cart button
const addButton =
  document.getElementById("addToCart");

if (addButton) {
  addButton.addEventListener(
    "click",
    addToCartHandler
  );
}