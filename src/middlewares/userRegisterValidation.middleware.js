import { body, validationResult } from "express-validator";

const userRegisterValidator = async (req, res, next) => {
  try {
    await body("name").notEmpty().withMessage("Name required").run(req);
    await body("email").isEmail().withMessage("Valid email required").run(req);
    await body("password")
      .notEmpty()
      .withMessage("Valid password required")
      .run(req);

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.send({ error: validationErrors.array()[0] });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};


export default userRegisterValidator;
