module.exports = {
  // COMMENT: if the user is logged in, redirect to the root page
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  // COMMENT: if the user is not logged in, redirect to the login page
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/log');
    }
  },
}
