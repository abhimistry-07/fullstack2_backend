const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userModel');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

UserRouter.post('/register', async (req, res) => {

    const { email, password, username, avatar } = req.body;

    try {
        const newPass = await bcrypt.hash(password, 5);

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({ msg: 'User already exists' })
        }

        const userData = await UserModel.create({ ...req.body, password: newPass });

        return res.status(200).send({ msg: 'Signup successfull', userData });

    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
});

UserRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;
    // console.log(email, password);

    try {

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(200).send({ msg: 'User not found, please register your self' });
        }

        const verify = await bcrypt.compare(password, user.password);
        console.log(verify);

        if (!verify) {
            return res.status(200).send({ msg: 'Wrong password' });
        } else {
            const token = await jwt.sign({ userId: user._id, userName: user.username }, SECRET_KEY);
            return res.status(200).send({ token });
        }

    } catch (error) {
        return res.status(400).send({ msg: 'Something went wrong', error });
    }
})


module.exports = { UserRouter };