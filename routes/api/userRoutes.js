const router = require("express").Router();
const {
  getAllUsers, getUserById, createUser, updateUser, delUser, addFriend, delFriend,
} = require("../../controllers/userController");


//adding directions for though routes
router
  .route("/")
  .get(getAllUsers)
  .post(createUser);


router  
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(delUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(delFriend);

module.exports = router;
