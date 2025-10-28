// Purpose: Attaches user session data to res.locals for easy access in
// EJS templates.
// 
// Check for the session user object. If it exists, expose it to all
// EJS templates via res.locals.user. Otherwise, set it to null.
function attachUserToLocals(req, res, next) {
    res.locals.user = req.session.user || null;
    next();
}

export default attachUserToLocals;
