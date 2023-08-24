const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    owner: String,
    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: [{ username: String, content: String }]
});

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = { BlogModel };