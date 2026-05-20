import alerts from "./alerts.js";

export default class Alert {
  constructor() {
    this.alerts = alerts;
  }

  render() {
    // if no alerts stop
    if (!this.alerts.length) return;

    // create section
    const alertSection =
      document.createElement("section");

    alertSection.classList.add(
      "alert-list"
    );

    // loop through alerts
    this.alerts.forEach((alert) => {
      const p =
        document.createElement("p");

      p.textContent = alert.message;

      p.style.backgroundColor =
        alert.background;

      p.style.color = alert.color;

      p.style.padding = "1rem";
      p.style.margin = "0";
      p.style.textAlign = "center";

      alertSection.appendChild(p);
    });

    // prepend to main
    const main =
      document.querySelector("main");

    main.prepend(alertSection);
  }
}