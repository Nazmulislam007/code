const router = require('express').Router();
const { searchUser, getInbox, addConversation } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { checkLogin } = require('../middlewares/common/checkLogin');

router.get('/', decorateHtmlResponse('Inbox'), checkLogin, getInbox);

router.post('/search', checkLogin, searchUser);

router.post('/conversation', checkLogin, addConversation);

module.exports = router;
