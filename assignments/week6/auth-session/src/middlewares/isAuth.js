function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.status(401).json({ success: false, message: 'Unauthorized' });
}

module.exports = isAuthenticated;
