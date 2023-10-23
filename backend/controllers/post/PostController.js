const PostModel = require("../../models/post/PostModel");
const UserModel = require("../../models/user/UserModel");

module.exports.createPost = async (req, res) => {
  const { title, content, writer } = req.body;

  const findUser = await UserModel.findOne({ userName: writer });
  const post = await PostModel.create({
    title: title,
    content: content,
    writer: findUser["_id"],
  });
  console.log(post);
  res.send(post);
};

module.exports.getPost = async (req, res) => {
  const postId = req.params.id;

  const findPost = await PostModel.findById(postId)
    .populate("writer", "userName")
    .exec();
  console.log(findPost);
  res.send(findPost);
};

module.exports.updatePost = async (req, res) => {
  const { title, content, writer } = req.body;
  const postId = req.params.id;

  const findUser = await UserModel.findOne({ userName: writer });
  if (findUser.userName !== writer) {
    res.send("does not match writer");
    return;
  }
  await PostModel.findByIdAndUpdate(
    postId,
    {
      title: title,
      content: content,
    },
    { new: true }
  ).then((findPost) => {
    console.log(findPost);
    res.send(findPost);
  });
};

module.exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  await PostModel.findByIdAndDelete(postId);
  res.status(204).send("deleted");
};

module.exports.getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const posts = await PostModel.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .populate("writer", "userName")
    .exec();

  console.log(posts);
  res.send(posts);
};
