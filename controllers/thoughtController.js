const thoughtController = {
    addThought({ params, body }, res) {
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).send();
          }
          res.json({ message: "Thought created" });
        })
        .catch((err) => res.json(err));
    },
  
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "Not found" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
  
    getThought(req, res) {
      Thought.find({})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .sort({ _id: -1 })
        .catch((err) => res.sendStatus(400));
    },
  
    thoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "Not found" });
          }
          res.json(dbThoughtData);
        });
    },
  
    delThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "Not found" });
          }
          return User.findOneAndUpdate(
            { thoughts: params.id },
            { $pull: { thoughts: params.id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "Not found" });
          }
        })
        .catch((err) => res.json(err));
    },
  
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "Not found" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
  
    delReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "Not found" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
  };
  
  module.exports = thoughtController;
