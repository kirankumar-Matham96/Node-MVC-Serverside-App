import path from "path";
import controllerModel from "../models/products.model.js";
import ProductsModel from "../models/products.model.js";
const productsList = controllerModel.getProductsData();

export default class ProductController {
  getProducts(req, res) {
    // sending static page
    // return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));

    // to use template engine
    return res.render("index", { productsList });
  }

  // to send the form
  getAddForm(req, res) {
    return res.render("newProduct", { errorMessage: null });
  }

  // to submit the form data
  addNewProduct(req, res) {
    const { name, desc, price, imageUrl } = req.body;
    controllerModel.addNewProduct(name, desc, price, imageUrl);
    return res.render("index", { productsList });
  }

  // to get the product to update
  getUpdateProductView(req, res, next) {
    // below line will get the url param (id) from the request url
    const { id } = req.params;
    const productFound = ProductsModel.getById(id);

    if (productFound) {
      return res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }

    return res.status(404).send("Product not found");
  }

  // to update the product
  updateProduct(req, res) {
    const { id, name, desc, price, imageUrl } = req.body;
    controllerModel.updateProduct(id, name, desc, price, imageUrl);
    const newProducts = controllerModel.getProductsData();
    // console.log({newProducts});
    return res.render("index", { productsList: newProducts });
  }
}
