const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { DB_HOST } = require('./.env');
const mongoose = require('mongoose');
const cors = require('cors');
const _ = require('lodash');
// const tasksDB = require('./api/models/index.js'); //created model loading here
const bodyParser = require('body-parser');
require('dotenv').config();
const api = require('./api');
const { tokenToUserMW } = require('./middlewares/token.middleware');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(DB_HOST , { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const whitelist = ['http://localhost:3001'];

app.use(cors({
    origin: (origin, cb) => {
      if (!origin || _.includes(whitelist, origin)) {
        return cb(null, true);
      }
      return cb(new Error('Not allowed by CORS'));
    },
  }));

// var routes = require('./api/index'); //importing route
// routes(app); //register the route

// app.use('/', tokenToUserMW, api);

app.get('/hello', (req, res) => {
  res.status(200).json({hello: "hello!"});
});

app.listen(port);

console.log('tasks board RESTful API server started on: ' + port);

module.exports = app;