const router = require('express').Router();
const { usersController } = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

router.get('/', decorateHtmlResponse('Users'), usersController);

module.exports = router;
