const { Router } = require("express");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPosts,
} = require("../controllers/post/PostController");
const { createComment } = require("../controllers/comment/CommentController");
const router = Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.get("/", getPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.post("/comment/:id", createComment);
module.exports = router;
