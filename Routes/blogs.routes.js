const { Router } = require("express");
const blogRouter = Router();

const { BlogModel } = require("../Model/Blog.model");
const { UserModel } = require("../Model/User.model");

//get request

blogRouter.get("/", async (req, res) => {
  const blogs = await BlogModel.find();
  res.send({ blogs: blogs });
});

//post request

blogRouter.post("/create", async (req, res) => {
  const { title, category, content, image } = req.body;
  const userId = req.userId;
  const user = await UserModel.findOne({ _id: userId });
  const newBlog = new BlogModel({
    title,
    category,
    content,
    image,
    auhtorId: userId,
    author: user.name,
  });
  try {
    await newBlog.save();
    res.status(200).send("Blog created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred while creating Blog");
  }
});

// put request

blogRouter.put("/edit/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const updated_blog = req.body;
  const userId = req.userId;

  const blog = await BlogModel.findOne({ _id: blogId });
  const authorId = blog.auhtorId;

  if (userId !== authorId) {
    res.send("Not authorised to update this post");
  } else {
    await BlogModel.findByIdAndUpdate(blogId, updated_blog);
    res.send(`Blog id: ${blogId} updated`);
  }
});

//delete request

blogRouter.delete("/delete/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const userId = req.userId;

  const blog = await BlogModel.findOne({ _id: blogId });
  const authorId = blog.auhtorId;

  if (userId !== authorId) {
    res.send("Not authorised to delete this post");
  } else {
    await BlogModel.findByIdAndDelete(blogId);
    res.send(`Blog id: ${blogId} deleted`);
  }
});

module.exports = { blogRouter };
