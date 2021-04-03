const router = require("express").Router();
const {
  getUsers,
  createNewUser,
  getUserById,
  sendNewAvatar,
  sendNewProfilData,
} = require("../controllers/users");

router.get("/users", getUsers);

router.get("/users/:userId", getUserById);

router.post("/users", createNewUser);

router.patch("/users/me/avatar", sendNewAvatar);

router.patch("/users/me", sendNewProfilData);

module.exports = router;
