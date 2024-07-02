const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("./DB/Conn");

const Blogs = require("./Models/AddBlog");

let app = express();
app.use(cors());
app.use(express.json());

let port = 8080;

// Blog section start

app.post("/blogs", async (req, res) => {
  try {
    let newBlog = new Blogs(req.body);
    newBlog
      .save()
      .then(() => {
        res.status(200).send(newBlog);
      })
      .catch((err) => {
        res.status(400).send("Unable to save blog");
      });
  } catch (error) {
    res.status(500).send("External Server Error");
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const getBlogs = await Blogs.find();
    res.status(200).send(getBlogs);
  } catch (error) {
    res.status(500).send("External Server Error");
  }
});

app.put('/blogs/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updateBlogs = await Blogs.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).send(updateBlogs);
    
  } catch (error) {
    res.status(404).send("Blog not found");
  }
})

app.delete('/blogs/:id', async (req, res)  => {
  try {
    const _id = req.params.id;
    const deleteBlog = await Blogs.deleteOne({ _id: _id});
    res.status(200).send(deleteBlog);
  } catch (error) {
    res.status(404).send("Blog not found");
  }
})

// Blog section end

app.listen(port, () => {
  console.log("blog running on port " + port);
});
