const router = require("express").Router();
const {
  
  getUserById,
  createUser,
  updateUser,
  delUser,
  addFriend,
  delFriend,
  getUsers,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(delUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(delFriend);

module.exports = router;
