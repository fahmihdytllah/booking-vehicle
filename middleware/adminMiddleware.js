module.exports = async (req, res, next) => {
  if (req?.auth && req.auth.role === 'admin') {
    return next();
  }
  return res.redirect('/u/dashboard');
};
