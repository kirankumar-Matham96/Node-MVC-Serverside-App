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
      req.session.userEmail = email;
      const products = ProductModel.getAll();
      return res.render("index", {
        products,
        userEmail: req.session.userEmail,
      });
    } else {
      return res.render("login", {
        errorMessage: "Email or Password is invalid!",
      });
    }
  }

  logout(req, res) {
    // clearing the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });

    // clearing the cookies
    res.clearCookie("lastVisit");
  }
}

export default UserController;
