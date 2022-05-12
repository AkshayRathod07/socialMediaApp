const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
} = require("../controllers/post");
// const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post( createPost);

router
  .route("/post/:id")
  .get( likeAndUnlikePost)
  .put( updateCaption)
  .delete( deletePost);

router.route("/posts").get( getPostOfFollowing);

router
  .route("/post/comment/:id")
  .put( commentOnPost)
  .delete( deleteComment);

module.exports = router;
