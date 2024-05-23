export const auth = (req, res, next) => {
  if (req.session.userEmail) {
    return next();
  }

  // redirect the request to the login route
  res.redirect("/login");
};
