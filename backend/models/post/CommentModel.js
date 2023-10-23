const mongoose = require("mongoose");
const UserModel = require("../user/UserModel");
const PostModel = require("./PostModel");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
  },
  postId: {
    type: String,
    required: true,
  },
  liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comments", CommentSchema);
