import path from "path";
import controllerModel from "../models/products.model.js";
const productsList = controllerModel.getProductsData();

export default class ProductController {
  getProducts(req, res) {
    // sending static page
    // return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));

    // to use template engine
    return res.render("products", { productsList });
  }

  // to send the form
  getAddForm(req, res) {
    return res.render("newProduct", { errorMessage: null });
  }

  // to submit the form data
  addNewProduct(req, res) {
    const { name, desc, price, imageUrl } = req.body;
    controllerModel.addNewProduct(name, desc, price, imageUrl);
    return res.render("products", { productsList });
  }
}
