import {
  getLocalStorage,
  loadHeaderFooter
} from "./utils.mjs";

async function init() {
  await loadHeaderFooter();

  renderCartContents();
}

init();

function updateCartCount() {
  const cartItems =
    getLocalStorage("so-cart") || [];

  const count =
    cartItems.length;

  const cartCount =
    document.querySelector(
      ".cart-count"
    );

  if (!cartCount) return;

  if (count > 0) {
    cartCount.textContent =
      count;

    cartCount.style.display =
      "flex";
  } else {
    cartCount.style.display =
      "none";
  }
}

function renderCartContents() {
  const cartItems =
    getLocalStorage("so-cart") || [];

  const productList =
    document.querySelector(
      ".product-list"
    );

  const cartFooter =
    document.querySelector(
      ".cart-footer"
    );

  const cartTotal =
    document.querySelector(
      ".cart-total"
    );

  const validItems =
    cartItems.filter(
      (item) =>
        item &&
        item.Id &&
        item.Name
    );

  if (!validItems.length) {
    productList.innerHTML = `
      <li class="empty-cart">
        Your cart is empty.
      </li>
    `;

    cartFooter.classList.add(
      "hide"
    );

    updateCartCount();

    return;
  }

  const htmlItems =
    validItems.map(
      (item) =>
        cartItemTemplate(item)
    );

  productList.innerHTML =
    htmlItems.join("");

  const total =
    calculateCartTotal(
      validItems
    );

  cartTotal.textContent =
    `Total: $${total}`;

  cartFooter.classList.remove(
    "hide"
  );

  updateCartCount();
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">

      <a
        href="#"
        class="cart-card__image"
      >
        <img
          src="${
            item.Images
              ?.PrimaryLarge || ""
          }"
          alt="${
            item.Name || ""
          }"
        />
      </a>

      <a href="#">
        <h2 class="card__name">
          ${
            item.Name || ""
          }
        </h2>
      </a>

      <p class="cart-card__color">
        ${
          item.Colors?.[0]
            ?.ColorName || ""
        }
      </p>

      <p class="cart-card__quantity">
        Qty:
        ${
          item.quantity || 1
        }
      </p>

      <p class="cart-card__price">
        $${
          item.FinalPrice || 0
        }
      </p>

      <button
        class="remove-item"
        data-id="${
          item.Id
        }"
      >
        Remove
      </button>

    </li>
  `;
}

function calculateCartTotal(
  cartItems
) {
  const total =
    cartItems.reduce(
      (sum, item) =>
        sum +
        (item.FinalPrice || 0) *
          (item.quantity || 1),
      0
    );

  return total.toFixed(2);
}

function removeFromCart(id) {
  let cartItems =
    getLocalStorage(
      "so-cart"
    ) || [];

  const index =
    cartItems.findIndex(
      (item) =>
        item.Id === id
    );

  if (index !== -1) {
    cartItems.splice(
      index,
      1
    );
  }

  localStorage.setItem(
    "so-cart",
    JSON.stringify(cartItems)
  );

  renderCartContents();
}

document.addEventListener(
  "click",
  (e) => {
    if (
      e.target.classList.contains(
        "remove-item"
      )
    ) {
      removeFromCart(
        e.target.dataset.id
      );
    }
  }
);