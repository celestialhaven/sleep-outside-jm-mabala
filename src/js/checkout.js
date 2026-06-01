import {
  loadHeaderFooter,
  getLocalStorage
} from "./utils.mjs";

import CheckoutProcess from "./checkoutProcess.mjs";

function updateCartCount() {
  const cartItems =
    getLocalStorage("so-cart") || [];

  const cartCount =
    document.querySelector(
      ".cart-count"
    );

  if (!cartCount) return;

  if (cartItems.length > 0) {
    cartCount.textContent =
      cartItems.length;

    cartCount.style.display =
      "flex";
  } else {
    cartCount.style.display =
      "none";
  }
}

function renderCheckoutItems() {
  const cartItems =
    getLocalStorage("so-cart") || [];

  const container =
    document.querySelector(
      "#checkout-items"
    );

  if (!container) return;

  container.innerHTML =
    cartItems
      .map(
        (item) => `
        <li>
          ${item.Name}
          (Qty:
          ${item.quantity || 1})
          - $${item.FinalPrice}
        </li>
      `
      )
      .join("");
}

async function init() {
  await loadHeaderFooter();

  updateCartCount();

  const checkout =
    new CheckoutProcess();

  document.querySelector(
    "#subtotal"
  ).textContent =
    `$${checkout
      .calculateSubtotal()
      .toFixed(2)}`;

  document.querySelector(
    "#shipping"
  ).textContent =
    `$${checkout
      .calculateShipping()
      .toFixed(2)}`;

  document.querySelector(
    "#tax"
  ).textContent =
    `$${checkout
      .calculateTax()
      .toFixed(2)}`;

  document.querySelector(
    "#orderTotal"
  ).textContent =
    `$${checkout
      .calculateTotal()
      .toFixed(2)}`;

  renderCheckoutItems();

  document
  .querySelector("#checkout-form")
  .addEventListener(
    "submit",
    (e) => {

      e.preventDefault();

      const form = e.target;

      if (!form.checkValidity()) {

        form.reportValidity();

        return;
      }

      // Clear cart
      localStorage.removeItem(
        "so-cart"
      );

      alert(
        "Order Submitted Successfully!"
      );

      window.location.href =
        "../cart/index.html";
    }
  );
}

init();