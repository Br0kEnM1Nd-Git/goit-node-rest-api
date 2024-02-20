const { model, Schema } = require("mongoose");
const {
  usersConstants: { SUBSCRIPTION_PLANS },
} = require("../constants/");

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: SUBSCRIPTION_PLANS,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Users = model("Users", usersSchema);

module.exports = Users;
