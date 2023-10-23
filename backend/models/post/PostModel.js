const mongoose = require("mongoose");
const UserModel = require("../user/UserModel");
const CommentModel = require("./CommentModel");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
  },
  createdAt: { type: Date, default: Date.now },
  liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: CommentModel,
      required: false,
    },
  ],
});

module.exports = mongoose.model("Posts", PostSchema);
