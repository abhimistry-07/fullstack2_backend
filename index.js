const express = require('express');
const { connection } = require('./db');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT
const cors = require('cors');
const { UserRouter } = require('./routes/userRoute');
const { BlogRouter } = require('./routes/blogRoute');
const { authentication } = require('./middlewares/auth');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.use('/api', UserRouter);
app.use('/api', authentication, BlogRouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Reading db');
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening on ${PORT}`);
});