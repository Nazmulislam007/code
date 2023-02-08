const router = require('express').Router();
const { inboxController } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

router.get('/', decorateHtmlResponse('Inbox'), inboxController);

module.exports = router;
