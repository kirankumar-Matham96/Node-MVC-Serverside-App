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
}
const products = [
  new ProductsModel(
    1,
    "Product 1",
    "Description for product 1",
    299.99,
    "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg"
  ),
  new ProductsModel(
    2,
    "Product 2",
    "Description for product 2",
    599.99,
    "https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_DpWeblab_.jpg"
  ),
  new ProductsModel(
    3,
    "Product 3",
    "Description for product 3",
    199.99,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5dNE2-fl1qJz2RaygtkHO7T6JbHypkcM5s5GP2A31_w&s"
  ),
];
