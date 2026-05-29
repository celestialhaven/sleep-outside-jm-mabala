const baseURL =
  import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {

  if (res.ok) {
    return res.json();
  }

  throw new Error(
    "Bad Response"
  );
}

export default class ProductData {

  constructor(category) {

    this.category =
      category;

  }

  async getData(
    category = this.category
  ) {

    const response =
      await fetch(
        `${baseURL}products/search/${category}`
      );

    const data =
      await convertToJson(
        response
      );

    return data.Result;
  }

  async findProductById(id) {

    const products =
      await this.getData();

    return products.find(
      (item) =>
        item.Id === id
    );
  }

  async searchProducts(query) {

    const categories = [
      "tents",
      "backpacks",
      "sleeping-bags",
      "hammocks"
    ];

    let products = [];

    for (const category of categories) {

      const categoryProducts =
        await this.getData(
          category
        );

      products.push(
        ...categoryProducts.map(
          (product) => ({
            ...product,
            Category: category
          })
        )
      );
    }

    const searchTerm =
      query.toLowerCase();

    return products.filter(
      (product) =>

        product.Name
          ?.toLowerCase()
          .includes(
            searchTerm
          ) ||

        product.Brand?.Name
          ?.toLowerCase()
          .includes(
            searchTerm
          ) ||

        product.DescriptionHtmlSimple
          ?.toLowerCase()
          .includes(
            searchTerm
          )
    );
  }
}