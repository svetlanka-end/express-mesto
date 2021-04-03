const User = require("../models/user");

module.exports.createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new TypeError())
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Данные не валидны",
        });
      }
      if (err.name === "TypeError") {
        return res.status(404).send({
          message: "Запрашиваемый пользователь не найден",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) =>
      res.send(
        users.map((user) => ({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        }))
      )
    )
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.sendNewAvatar = (req, res) => {
  const { link } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: link },
    { new: true, runValidators: true }
  )
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      }
      if (err.name === "CastError") {
        return res.status(404).send({
          message: "Запрашиваемый пользователь не найден",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.sendNewProfilData = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      }
      if (err.name === "CastError") {
        return res.status(404).send({
          message: "Запрашиваемый пользователь не найден",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};
