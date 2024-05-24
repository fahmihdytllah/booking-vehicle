module.exports = async (req, res, next) => {
  if (req?.auth && req?.session?.auth) {
    return next();
  }
  return res.redirect('/auth/login?redirect_uri=' + req.originalUrl);
};