module.exports = {
  auth: require('./authMiddleware'),
  approver: require('./approverMiddleware'),
  admin: require('./adminMiddleware')
}