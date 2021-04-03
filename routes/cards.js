const router = require("express").Router();
const {
  getCards,
  createNewCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);

router.post("/cards", createNewCards);

router.delete("/cards/:cardId", deleteCardById);

router.put("/cards/:cardId/likes", likeCard);

router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
