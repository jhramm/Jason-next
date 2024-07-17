const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    comments: [
        {
            userName: {
            },
            comment: {
                type: String,
            }
        }
    ],
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },

    tags: [
        {
           type: String,
           required: true
        }
    ]

})
const Blogs = mongoose.model('blogs', blogsSchema);
module.exports = Blogs;
