import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems =
    getLocalStorage("so-cart") || [];

  console.log(cartItems);

  if (!cartItems.length) {
    document.querySelector(
      ".product-list"
    ).innerHTML =
      "<p>Your cart is empty.</p>";

    return;
  }

  const validItems =
    cartItems.filter(
      (item) =>
        item &&
        item.Id &&
        item.Name
    );

  const htmlItems =
    validItems.map((item) =>
      cartItemTemplate(item)
    );

  document.querySelector(
    ".product-list"
  ).innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image || ""}"
          alt="${item.Name || ""}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">
          ${item.Name || ""}
        </h2>
      </a>

      <p class="cart-card__color">
        ${
          item.Colors?.[0]
            ?.ColorName || ""
        }
      </p>

      <p class="cart-card__quantity">
        qty: 1
      </p>

      <p class="cart-card__price">
        $${
          item.FinalPrice || 0
        }
      </p>

      <button
        class="remove-item"
        data-id="${item.Id}"
      >
        Remove
      </button>
    </li>
  `;
}

function removeFromCart(id) {
  let cartItems =
    getLocalStorage("so-cart");

  const index =
    cartItems.findIndex(
      (item) => item.Id === id
    );

  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  localStorage.setItem(
    "so-cart",
    JSON.stringify(cartItems)
  );

  renderCartContents();
}

// remove button listener
document.addEventListener(
  "click",
  (e) => {
    if (
      e.target.classList.contains(
        "remove-item"
      )
    ) {
      const id =
        e.target.dataset.id;

      removeFromCart(id);
    }
  }
);

renderCartContents();