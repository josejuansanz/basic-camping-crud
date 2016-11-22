let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let config = require('config');

let CampingRoutes = require('./app/routes/CampingRoutes');

mongoose.connect(config.DBHost);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use("/v1/", CampingRoutes);

app.listen(9001, () => {
  console.log('Server started and listening on port 9001');
});

module.exports = app; // For testing