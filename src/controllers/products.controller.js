import ProductModel from "../models/products.model.js";

class ProductsController {
  getProducts(req, res, next) {
    const products = ProductModel.getAll();
    // sending static page
    // return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));

    // to use template engine
    return res.render("index", { products });
  }

  // to send the form
  getAddForm(req, res, next) {
    return res.render("newProduct", {
      errorMessage: null,
    });
  }

  // to submit the form data
  addNewProduct(req, res) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    // ProductModel.add(req.body);
    ProductModel.add(name, desc, price, imageUrl);

    var products = ProductModel.getAll();
    res.render("index", { products });
  }

  // to get the product to update
  getUpdateProductView(req, res) {
    // below line will get the url param (id) from the request url
    const { id } = req.params;
    const productFound = ProductModel.getById(id);

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
    ProductModel.update(req.body);
    var products = ProductModel.getAll();
    res.render("index", { products });
  }

  // to delete product
  deleteProduct(req, res) {
    const { id } = req.params;

    const productFound = ProductModel.getById(id);

    if (!productFound) {
      return res.status(404).send("Product not found");
    }
    ProductModel.delete(id);
    const products = ProductModel.getAll();
    return res.status(200).render("index", { products });
  }
}

export default ProductsController;
