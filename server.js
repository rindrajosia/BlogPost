const express = require('express');
const dotenv = require('dotenv');

const ping = require('./routes/ping');
const posts = require('./routes/posts');

dotenv.config({path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/api/ping', ping);

app.use('/api/posts', posts);


app.listen(
  PORT,
  console.log(`Server running in port ${process.env.NODE_ENV} mode on port ${PORT}`));
