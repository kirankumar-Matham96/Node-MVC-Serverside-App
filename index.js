import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import ProductController from "./src/controllers/products.controller.js";
import { validateRequest } from "./src/middlewares/validation.middleware.js";

const PORT = 8000;
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
app.get("/new-product", controller.getAddForm);
app.post("/", validateRequest, controller.addNewProduct);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
