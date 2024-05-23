import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import ProductController from "./src/controllers/products.controller.js";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import userValidationRegister from "./src/middlewares/userRegisterValidation.middleware.js";
import userLoginValidator from "./src/middlewares/userLoginValidator.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

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

// set up view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// parsing form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// setting up ejs layouts middleware
app.use(ejsLayouts);
// setting up folder path for the static content
app.use(express.static(publicFolderPath));
// setting up folder path for the static content
// app.use(express.static(folderPath));

// using cookie parser
app.use(cookieParser());
// to set the cookies for every route (application level)
app.use(setLastVisit);

// setting session
app.set("truest proxy", 1);
app.use(
  session({
    secret: "Some Secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to false since it is http.
  })
);

// routing to the products page
app.get("/", auth, controller.getProducts);

//  routing to the add form
app.get("/add-product", auth, controller.getAddForm);
app.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validateRequest,
  controller.addNewProduct
);

// routing to get updated product details
app.get("/update-product/:id", auth, controller.getUpdateProductView);

// to update the data of a product
app.post("/update-product", auth, validateRequest, controller.updateProduct);

// to delete the post
app.post("/delete-product/:id", auth, controller.deleteProduct);

// to register
app.get("/register", userController.getRegister);
app.post("/register", userValidationRegister, userController.postRegister);

// to login
app.get("/login", userController.getLogin);
app.post("/login", userLoginValidator, userController.postLogin);

// to logout
app.get("/logout", userController.logout);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}: http://localhost:${PORT}/`);
});
