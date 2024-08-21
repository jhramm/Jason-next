const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
  comments: [
    {
      userName: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  image: {
    type: String,
    required: true,
  },
  likes: [
    {
      userId: {
        type: String,
      },
      liked: {
        type: Boolean
      }
    },
  ],

  tags: [
    {
      type: String,
      required: true,
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});
const Blogs = mongoose.model("blogs", blogsSchema);
module.exports = Blogs;
