const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const cookie = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookie) {
        try {
            const token = cookie[process.env.COOKIE_NAME];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;

            if (res.locals.html) {
                res.locals.loggedInUser = decode;
            }
            next();
        } catch (error) {
            if (res.locals.html) {
                res.redirect('/');
            } else {
                res.status(500).json({
                    errors: {
                        msg: 'Authentication failture!',
                    },
                });
            }
        }
    } else if (res.locals.html) {
        res.redirect('/');
    } else {
        res.status(401).json({
            error: 'Authentication failture!',
        });
    }
};

const redirectLoggedIn = (req, res, next) => {
    const cookie = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookie) return res.redirect('/inbox');
    next();
};

module.exports = {
    checkLogin,
    redirectLoggedIn,
};
