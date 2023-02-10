const { check, validationResult } = require('express-validator');

const doLoginValidators = [
    check('username')
        .isLength({
            min: 1,
        })
        .withMessage('Mobile number or email is required'),
    check('password').isLength({ min: 1 }).withMessage('Password is required'),
];

const doLoginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if (Object.keys(mappedError).length > 0) {
        return res.render('index', {
            data: {
                username: req.body.username,
            },
            errors: mappedError,
        });
    }

    return next();
};

module.exports = {
    doLoginValidators,
    doLoginValidationHandler,
};
