const { Schema, model } = require("mongoose");
const Thought = require('./Thought');
// 
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Enter Username',
      trim: true,
      
    },
// adding validators with email string for the user schema
    email: {
      type: String,
      required: 'enter an email address',
      unique: true,
      validate: {
          validator(validEmail) {

            // email searches for the criteria listed below
            return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
              validEmail
            );
          },
          message: "enter an email address",
        },
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// retrieves friends array field
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
