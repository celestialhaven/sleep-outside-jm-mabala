export default class CheckoutProcess {
  constructor() {
    this.cartItems =
      JSON.parse(
        localStorage.getItem(
          "so-cart"
        )
      ) || [];
  }

  calculateSubtotal() {
    return this.cartItems.reduce(
      (sum, item) =>
        sum +
        item.FinalPrice *
          (item.quantity || 1),
      0
    );
  }

  calculateShipping() {
    return 10;
  }

  calculateTax() {
    return (
      this.calculateSubtotal() *
      0.06
    );
  }

  calculateTotal() {
    return (
      this.calculateSubtotal() +
      this.calculateShipping() +
      this.calculateTax()
    );
  }
}