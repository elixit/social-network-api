const router = require("express").Router();
const {
  getAllThought, thoughtById, addThought, updateThought, delThought,
  addReaction, delReaction,
} = require("../../controllers/thoughtController");

// adding directions for thought routes
router 
  .route("/")
  .get(getAllThought)
  .post(addThought);


router
  .route("/:id")
  .get(thoughtById)
  .put(updateThought)
  .delete(delThought);


router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(delReaction);

module.exports = router;
