import UserModel from "../models/user.model.js";
import ProductModel from "../models/products.model.js";

class UserController {
  getRegister(req, res) {
    return res.render("user-registration", { errorMessage: null });
  }

  postRegister(req, res) {
    UserModel.register(req.body);
    return res.render("login", { errorMessage: null });
  }

  getLogin(req, res) {
    return res.render("login", { errorMessage: null });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const userFound = UserModel.login(email);
    if (!userFound) {
      return res.render("login", {
        errorMessage: "User is not registered yet!",
      });
    }

    if (userFound && userFound.password === password) {
      const products = ProductModel.getAll();
      return res.render("index", { products });
    } else {
      return res.render("login", {
        errorMessage: "Email or Password is invalid!",
      });
    }
  }
}

export default UserController;
