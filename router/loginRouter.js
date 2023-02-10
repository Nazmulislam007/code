const router = require('express').Router();
const { getLogin, login, logout } = require('../controller/loginController');
const { redirectLoggedIn } = require('../middlewares/common/checkLogin');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const {
    doLoginValidators,
    doLoginValidationHandler,
} = require('../middlewares/login/loginValidation');

const pageTitle = 'Login';

router.get('/', decorateHtmlResponse(pageTitle), redirectLoggedIn, getLogin);

router.post(
    '/',
    decorateHtmlResponse(pageTitle),
    doLoginValidators,
    doLoginValidationHandler,
    login
);

router.delete('/', logout);

module.exports = router;
