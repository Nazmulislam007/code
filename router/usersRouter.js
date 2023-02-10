const router = require('express').Router();
const { getUsers, addUsers, removeUser } = require('../controller/usersController');
const { checkLogin } = require('../middlewares/common/checkLogin');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avaterUpload');
const { addUserValidator, addUserValidatorHandler } = require('../middlewares/users/userValidator');

router.get('/', decorateHtmlResponse('Users'), checkLogin, getUsers);

router.post('/', avatarUpload, addUserValidator, addUserValidatorHandler, addUsers);

router.delete('/:id', removeUser);

module.exports = router;
