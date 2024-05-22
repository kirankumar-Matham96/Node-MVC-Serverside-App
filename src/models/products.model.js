export default class ProductModel {
  constructor(_id, _name, _description, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.desc = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  static getAll() {
    return products;
  }

  static update(productObj) {
    const index = products.findIndex((p) => p.id == productObj.id);
    products[index] = productObj;
  }

  static delete(id) {
    const index = products.findIndex((p) => p.id == id);
    products.splice(index, 1);
  }

  static add(productObj) {
    let newProduct = new ProductModel(
      products.length + 1,
      productObj.name,
      productObj.desc,
      productObj.price,
      productObj.imageUrl
    );
    products.push(newProduct);
  }

  static getById(id) {
    return products.find((p) => p.id == id);
  }
}

const products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for product 1",
    299.99,
    "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for product 2",
    299.99,
    "https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_DpWeblab_.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for product 3",
    299.99,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5dNE2-fl1qJz2RaygtkHO7T6JbHypkcM5s5GP2A31_w&s"
  ),
];
