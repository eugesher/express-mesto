const router = require('express').Router();
const {
  validateRequestHeaders,
  validateCreateCardRequest,
  validateCardId,
} = require('../middlewares/validations');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', validateRequestHeaders, getCards);
router.post('/', validateCreateCardRequest, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
