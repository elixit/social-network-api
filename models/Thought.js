const { Schema, model, Types } = require("mongoose");

// adding a reaction schema within thought model
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      // add array of id values for thought model
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// adding thought shchema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Enter a thought",
      minlength: 1,
      maxlength: 280,
    },

   

    username: {
      type: String,
      required: true,
    },

    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
