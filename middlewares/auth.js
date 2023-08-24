require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authentication = (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(200).send({ msg: 'Please login' });
        };

        const decoded = jwt.verify(token, SECRET_KEY);

        if (!decoded) {
            return res.status(200).send({ msg: 'You are not authorized' });
        }

        req.body.userId = decoded.userId;
        req.body.userName = decoded.userName;

        next();

    } catch (error) {
        console.log(error);
    }
};

module.exports = { authentication };