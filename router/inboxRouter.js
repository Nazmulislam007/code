const router = require('express').Router();
const { inboxController } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { checkLogin } = require('../middlewares/common/checkLogin');

router.get('/', decorateHtmlResponse('Inbox'), checkLogin, inboxController);

module.exports = router;
