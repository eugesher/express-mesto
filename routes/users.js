const router = require('express').Router();

const {
  validateRequestHeaders,
  validateGetUserByIdRequest,
  validateUpdateUserInfoRequest,
  validateUpdateUserAvatarRequest,
} = require('../middlewares/validations');
const {
  getUsers, getUserById, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', validateRequestHeaders, getUsers);
router.get('/me', validateRequestHeaders, getCurrentUser);
router.get('/:userId', validateGetUserByIdRequest, getUserById);
router.patch('/me', validateUpdateUserInfoRequest, updateUserInfo);
router.patch('/me/avatar', validateUpdateUserAvatarRequest, updateUserAvatar);

module.exports = router;
