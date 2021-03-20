const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUserInfo);

module.exports = router;
