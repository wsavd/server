var express = require('express');
const path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

const cors = require('cors');
app.use(cors());

/* db */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.set('database', (process.env.MONGODB_URI || 'mongodb://admin:qwerty123__@ds123725.mlab.com:23725/testdb3432'));
mongoose.connect(app.get('database'))
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var tests = require('./routes/test')
app.use('/api/v1', tests)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});