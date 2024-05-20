import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import ProductController from "./src/controllers/products.controller.js";
import { validateRequest } from "./src/middlewares/validation.middleware.js";

const PORT = 8888;
const folderPath = path.join("src", "views");
const controller = new ProductController();

//  initializing express
const app = express();

// parsing form data
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// setting up ejs layouts middleware
app.use(ejsLayouts);

// setting up folder path for the static content
app.use(express.static(folderPath));

// routing to the products function
app.get("/", controller.getProducts);

//  routing to the add form
app.get("/add-product", controller.getAddForm);
app.post("/", validateRequest, controller.addNewProduct);

// routing to get updated product details
app.get("/get-update-product/:id", controller.getUpdateProductView);

// to update the data of a product
app.post("/update-product", validateRequest, controller.updateProduct);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}: http://localhost:${PORT}/`);
});
