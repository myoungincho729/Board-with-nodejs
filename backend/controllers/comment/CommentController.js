const CommentModel = require("../../models/post/CommentModel");
const UserModel = require("../../models/user/UserModel");
const PostModel = require("../../models/post/PostModel");

module.exports.createComment = async (req, res) => {
  const postId = req.params.id;
  const { content, writer } = req.body;

  const findUser = await UserModel.findOne({ userName: writer });
  const comment = await CommentModel.create({
    content: content,
    writer: findUser,
    postId: postId,
  });

  const findPost = await PostModel.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  );

  // console.log(comment);
  console.log(findPost);
  res.send(comment);
};
