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

// Blog section end

app.listen(port, () => {
  console.log("blog running on port " + port);
});
