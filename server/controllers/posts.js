import mongoose from "mongoose";
import Post from "../models/postMessage.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { postId: _id } = req.params;

  // post from body not contains _id -> add id at UPDATE
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { postId: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    await Post.findByIdAndRemove(_id);
    res.send("Deleted successfully");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  const { postId: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const post = await Post.findById(_id);

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export { getPosts, createPost, updatePost, deletePost, likePost };
