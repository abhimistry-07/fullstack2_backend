const express = require('express');
const { BlogModel } = require('../models/blogModel');
const BlogRouter = express.Router();
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

BlogRouter.post('/blogs', (req, res) => {

    const name = req.body.userName;
    const owner = req.body.userId;

    // console.log(name, "Router");

    try {
        const newBlog = BlogModel.create({ ...req.body, username: name, owner: owner });

        return res.status(200).send({ msg: 'Succesfully posted new blog', newBlog });
        // console.log(newBlog);
    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});

BlogRouter.get('/blogs', async (req, res) => {

    const { title, category, sort, order } = req.query;

    // title, category, sort, order
    try {
        let q = {}

        if (title) {
            q.title = { $regex: title, $options: 'i' }
        }

        if (category) {
            q.category = { $regex: category, $options: 'i' }
        }

        let sortData = {}

        if (order == "asc") {
            sortData = { date: 1 }
        } else {
            sortData = { date: -1 }
        }

        const allBlogs = await BlogModel.find(q).sort(sortData);
        // console.log(allBlogs,"Be Present");

        return res.status(200).send({ msg: 'All blogs', allBlogs });

    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});

BlogRouter.patch('/blogs/:id', async (req, res) => {

    const ID = req.params.id;
    const payload = req.body;
    // console.log(payload);

    const logedInUserId = req.body.userId;

    try {
        const isOwner = await BlogModel.findOne({ owner: logedInUserId });

        if (!isOwner) {
            return res.status(200).send({ msg: "You can't update others blog" });
        } else {
            const updateBlog = await BlogModel.findByIdAndUpdate({ _id: ID }, payload);

            return res.status(200).send({ msg: "Blog updated" })
        }
    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});

BlogRouter.delete('/blogs/:id', async (req, res) => {

    const ID = req.params.id;
    const payload = req.body;
    // console.log(payload);

    const logedInUserId = req.body.userId;

    try {
        const isOwner = await BlogModel.findOne({ owner: logedInUserId });

        if (!isOwner) {
            return res.status(200).send({ msg: "You can't delete others blog" });
        } else {
            const deleteBlog = await BlogModel.findByIdAndDelete({ _id: ID },);

            return res.status(200).send({ msg: "Blog deleted" })
        }
    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});



module.exports = { BlogRouter };