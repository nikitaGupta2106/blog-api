const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  auhtor: { type: String },
  auhtorId: { type: String },
  content: { type: String, required: true },
  image: { type: String },
});

const BlogModel = mongoose.model("blog", blogSchema);
module.exports = { BlogModel };
