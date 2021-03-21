const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUserInfo);
router.patch('/:id/avatar', updateUserAvatar);

module.exports = router;
