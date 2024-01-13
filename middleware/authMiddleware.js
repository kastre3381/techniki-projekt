// authMiddleware.js

function isAuthenticated(req, res, next) {
    // Check if req.session exists and if a user is stored in the session
    console.log('Session:', req.session);
    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware
        return next();
      } else {
        // User is not authenticated
        return res.json({ isAuthenticated: false });
      }
    }
  
  module.exports = isAuthenticated;
  