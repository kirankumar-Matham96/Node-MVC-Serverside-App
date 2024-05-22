import UserModel from "../models/user.model.js";

class UserController {
  getRegister(req, res) {
    return res.render("user-registration", { errorMessage: null });
  }

  add(req, res) {
    UserModel.register(req.body);
    res.send(req.body);
  }

  getLogin(req,res) {
    return res.render("login", { errorMessage: null });
  }

  login(req, res) {
    const { email, password } = req.body;
    const userFound = UserModel.login(email);
    if (!userFound) {
      return res.render("login", {
        errorMessage: "User is not registered yet!",
      });
    }

    if (userFound && userFound.password === password) {
      res.status(200).send({ Message: "Login success!" });
    } else {
      return res.render("login", {
        errorMessage: "Email or Password is invalid!",
      });
    }
  }
}

export default UserController;
