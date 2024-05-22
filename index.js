import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import ProductController from "./src/controllers/products.controller.js";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/register.controller.js";
import userValidationRegister from "./src/middlewares/userRegisterValidation.middleware.js";
import userLoginValidator from "./src/middlewares/userLoginValidator.js";

// port number
const PORT = 8888;

// to load static pages
// const folderPath = path.join("src", "views");

// to load public folder files
const publicFolderPath = path.resolve("public");

const controller = new ProductController();
const userController = new UserController();

//  initializing express
const app = express();

// parsing form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// setting up ejs layouts middleware
app.use(ejsLayouts);

// setting up folder path for the static content
// app.use(express.static(folderPath));

// setting up folder path for the static content
app.use(express.static(publicFolderPath));

// routing to the products function
app.get("/", controller.getProducts);

//  routing to the add form
app.get("/add-product", controller.getAddForm);
app.post(
  "/",
  uploadFile.single("imageUrl"),
  validateRequest,
  controller.addNewProduct
);

// routing to get updated product details
app.get("/update-product/:id", controller.getUpdateProductView);

// to update the data of a product
app.post("/update-product", validateRequest, controller.updateProduct);

// to delete the post
app.post("/delete-product/:id", controller.deleteProduct);

// to register
app.get("/register", userController.getRegister);
app.post("/register", userValidationRegister, userController.postRegister);

// to login
app.get("/login", userController.getLogin);
app.post("/login", userLoginValidator, userController.postLogin);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}: http://localhost:${PORT}/`);
});
