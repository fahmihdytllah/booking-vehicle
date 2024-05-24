module.exports = async (req, res, next) => {
  if (req?.auth && req.auth.role === 'approver') {
    return next();
  }
  return res.redirect('/u/dashboard');
};