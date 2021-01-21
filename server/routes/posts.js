import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:postId", updatePost);
router.delete("/:postId", deletePost);
router.patch("/:postId/likePost", likePost);

export default router;
