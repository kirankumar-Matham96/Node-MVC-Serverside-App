import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
  /**
   * The below commented code was presented in the lecture. It is not working.
   * By following the document, if we store the functions and use them later, unexpected errors will occur.
   * Hence using the individual run functions.
   */
  // // 1. setup the rules for validation
  // const rules = [
  //   body("name").notEmpty().withMessage("Name is required*"),
  //   body("price")
  //     .isFloat({ gt: 0 })
  //     .withMessage("Price should be a positive number*"),
  //   body("imageUrl").isURL().withMessage("Invalid URL*"),
  // ];

  // // 2. run the rules to see the errors
  // await Promise.all(
  //   rules.map((rule) => {
  //     rule.run(req);
  //   })
  // );

  try {
    // 1. running the rules
    await body("name").notEmpty().withMessage("Name is requires*").run(req);
    await body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be positive*")
      .run(req);
    await body("imageUrl").isURL().withMessage("invalid URL*").run(req);

    // 2. check if there are any errors
    let validationErrors = validationResult(req);

    // 3. based on the results, call the function
    if (!validationErrors.isEmpty()) {
      return res.status(401).render("newProduct", {
        errorMessage: validationErrors.array()[0].msg,
      });
    }
    return next();
  } catch (error) {
    console.log("error in catch: ", error);
  }
}

export default validateRequest;