var express = require('express');
var app = express();

const cors = require('cors');
app.use(cors());

/* db */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.set('database', (process.env.MONGODB_URI || 'mongodb://admin:qwerty123__@ds123725.mlab.com:23725/testdb3432'));
mongoose.connect(app.get('database'))
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var tests = require('./routes/test');
app.use('/api/v1', tests)

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});