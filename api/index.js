const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("./DB/Conn");

const Blogs = require("./Models/AddBlog");
const Auth = require("./Models/Auth");

let app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

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

app.get("/blogs/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getBlogs = await Blogs.findById(_id);
    res.status(200).send(getBlogs);
  } catch (error) {
    res.status(404).send("Blog not found!");
  }
});

app.put("/blogs/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateBlogs = await Blogs.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(updateBlogs);
  } catch (error) {
    res.status(404).send("Blog not found");
  }
});

app.delete("/blogs/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteBlog = await Blogs.deleteOne({ _id: _id });
    res.status(200).send(deleteBlog);
  } catch (error) {
    res.status(404).send("Blog not found");
  }
});

app.post("/filterblogs", async (req, res) => {
  try {
    const tagNames = req.body.tagNames;
    const blogs = await Blogs.find({ tags: { $in: tagNames } });
    res.status(200).send(blogs);
  } catch (error) {
    res.status(404).send("Blog not found");
  }
});

// Blog section end

// Auth Section Start
app.post("/signup", async (req, res) => {
  try {
    const existingUser = await Auth.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = new Auth(req.body);
      await newUser.save(); 
      res.status(200).send(newUser);
    } else {
      res.status(404).send("User already exists");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await Auth.findOne({ email: email});
    if(findUser !== null) {
      const matchPassword = await bcrypt.compare(password, findUser.password);
      if(matchPassword) {
        res.status(200).send(findUser);
      } else {
        res.status(404).send("Invalid password!");
      }
    }
    
  } catch (error) {
    
  }
});
// Auth Section End

app.listen(port, () => {
  console.log("blog running on port " + port);
});
