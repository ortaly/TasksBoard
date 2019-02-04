const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
// const tasksDB = require('./api/models/index.js'); //created model loading here
const bodyParser = require('body-parser');
require('dotenv').config();
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/tasksBoardRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('tasks board RESTful API server started on: ' + port);