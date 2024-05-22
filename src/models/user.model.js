import { v4 as uuidv4 } from "uuid";

const users = [];

class UserModel {
  constructor(name, email, password) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static register(user) {
    const { name, email, password } = user;
    const newUser = new UserModel(name, email, password);
    users.push(newUser);
    console.log(users);
  }

  static login(email) {
    const userFound = users.find((user) => user.email === email);
    return userFound;
  }
}

export default UserModel;
