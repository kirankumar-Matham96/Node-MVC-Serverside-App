export default class ProductsModel {
  constructor(_id, _name, _description, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  static getProductsData() {
    return products;
  }

  static addNewProduct(productName, desc, price, imageUrl) {
    products.push(
      new ProductsModel(products.length + 1, productName, desc, price, imageUrl)
    );
  }

  static getById(id) {
    return products.find((product) => product.id === id);
  }

  // TODO: Product data is not updating!
  static updateProduct(id, productName, desc, price, imageUrl) {
    // method 1
    // products.map((product) => {
    //   if (product.id === id) {
    //     product.name = productName;
    //     product.description = desc;
    //     product.price = price;
    //     product.imageUrl = imageUrl;
    //   }
    // });

    // method-2
    const foundProduct = products.find((product) => {
      console.log(product);
      if (product.id === id) {
        return product;
      }
    });
    // console.log(products[foundProduct]);
    products[foundProduct] = { id, productName, desc, price, imageUrl };
  }
}

let products = [];

const pushInitialProducts = () => {
  const initialProducts = [
    {
      id: "1",
      name: "Product 1",
      description: "Description for product 1",
      price: 299.99,
      imageUrl:
        "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: "2",
      name: "Product 2",
      description: "Description for product 2",
      price: 299.99,
      imageUrl:
        "https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_DpWeblab_.jpg",
    },
    {
      id: "3",
      name: "Product 3",
      description: "Description for product 3",
      price: 299.99,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5dNE2-fl1qJz2RaygtkHO7T6JbHypkcM5s5GP2A31_w&s",
    },
  ];

  products = initialProducts.map((product) => {
    const newProduct = new ProductsModel(
      product.id,
      product.name,
      product.description,
      product.price,
      product.imageUrl
    );
    console.log({ newProduct });
    return newProduct;
  });
};

pushInitialProducts();
