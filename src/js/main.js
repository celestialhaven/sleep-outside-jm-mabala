import Alert from "./Alert.js";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const alert = new Alert();

alert.render();

const dataSource =
  new ProductData("tents");

const listElement =
  document.querySelector(
    ".product-list"
  );

const myList = new ProductList(
  "tents",
  dataSource,
  listElement
);

myList.init();