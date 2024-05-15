export function validateRequest(req, res, next) {
  const { name, price, imageUrl } = req.body;
  let errors = [];
  // validation
  if (!name || name.trim() == "") {
    console.log({ name });
    errors.push("Name is Required*");
  }

  if (price < 1) {
    errors.push("Price must be a positive number*");
  }

  try {
    const validUrl = new URL(imageUrl);
  } catch (error) {
    errors.push("Please enter valid URL");
  }

  if (errors.length > 0) {
    return res.render("newProduct", { errorMessage: errors[0] });
  }

  next();
}
