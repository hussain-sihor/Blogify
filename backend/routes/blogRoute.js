const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");
const User = require("../model/user")

const createBlog = async (req, res) => {
	const { title, content, author, tags } = req.body;

	if (!title || !content || !author || !tags) {
		res.status(400).json({ message: "All fields are required" });
		return;
	}

	// Create New Blog
	const newBlog = await Blog.create({
		title,
		content,
		author,
		tags,
	});
	res.status(200).json({ message: newBlog });
};


const deleteBlog = async (req, res) => {
	var id = req.params.id;

	const deleted = await Blog.findByIdAndDelete(id);

	res.status(200).json({ message: deleted });
};


const getBlogs = async (req, res) => {
	const blogs = await Blog.find().populate({
		path: "author",
		model: User,
		select:"name email"
	})

	res.status(200).json({ message: blogs });
};

const getBlog = async (req, res) => {
  var id = req.params.id;
	const blog = await Blog.find({author:id}).populate({
		path: "author",
		model: User,
		select:"name email"
	});
	res.status(200).json(blog );
};

const getUserBlogs = async (req, res) => {
	const { id } = req.body;
	const blogs = await Blog.find({ author: id });

	res.status(200).json({ message: blogs });
};


const updateBlog = async (req, res) => {
	var id = req.params.id;

	const { title, content, author, tags } = req.body;

	if (!title || !content || !author || !tags) {
		res.status(400).json({ message: "All fields are required" });
		return;
	}

	// Update Blog
	await Blog.findByIdAndUpdate(id, {
		title,
		content,
		author,
		tags,
	});

	const updatedBlog = await Blog.findById(id);

	res.status(200).json({ message: updatedBlog });
};


router.post("/createblog", createBlog);

router.delete("/deleteblog/:id", deleteBlog);

router.post("/updateblog/:id", updateBlog);

router.get("/getblogs", getBlogs);

router.get("/getblog/:id", getBlog);

router.get("/getuserblogs", getUserBlogs);



module.exports = router;
