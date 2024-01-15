function isAuthenticated(req, res, next) {
    console.log('Session:', req.session);
    if (req.session && req.session.user) {
        return next();
      } else {
        return res.json({ isAuthenticated: false });
      }
    }
  
  module.exports = isAuthenticated;
  