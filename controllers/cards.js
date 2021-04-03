const Card = require("../models/card");

module.exports.createNewCards = (req, res) => {
  const { name, link } = req.body;

  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      _id: card._id,
      owner: card.owner,
      likes: card.likes,
    }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ ok: true }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      if (err.name === "CastError") {
        return res.status(404).send({
          message: "Карточка не найдена",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getCards = (req, res) => {
  Card.find()
    .populate(["owner", "likes"])
    .then((cards) => res.send(
      cards.map((card) => ({
        name: card.name,
        link: card.link,
        _id: card._id,
        owner: {
          name: card.owner.name,
          about: card.owner.about,
          avatar: card.owner.avatar,
          _id: card.owner._id,
        },
        likes: card.likes,
      })),
    ))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send({ ok: true }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      if (err.name === "CastError") {
        return res.status(404).send({
          message: "Карточка не найдена",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send({ ok: true }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      if (err.name === "CastError") {
        return res.status(404).send({
          message: "Карточка не найдена",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};