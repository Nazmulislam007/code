const router = require('express').Router();
const { loginController } = require('../controller/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

router.get('/', decorateHtmlResponse('Login'), loginController);

module.exports = router;
