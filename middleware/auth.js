const isAuth = (req, res, next) => {
  try {
    if (req.loggedUser) {
      next();
    } else {
      res.status(401).json({ msg: "you are not authenticated"})
    }
  } catch (err) {
    next(err);
  }
}

module.exports = isAuth;