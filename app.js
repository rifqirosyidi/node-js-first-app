const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// DB Authentication
mongoose.connect("mongodb://rief:noPassword@localhost/nodekb?authSource=admin&w=1");
let db = mongoose.connection;


// Check Connnection
db.once('open', function() {
  console.log('Connected to MongoDB');
});
// Check for Db errors;
db.on('error', function(err) {
  console.log(err);
});

// Init App
const app = express();

// Bring Model
let Article = require('./models/article');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res) {
  Article.find({}, function(err, articles) {
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title:'Articles',
        articles:articles
      });
    }
  });
});

// Add Route
app.get('/articles/add', function(req, res) {
  res.render('add_article', {
    title:'Add Articles'
  });
});

// Start Server
app.listen(3000, function() {
  console.log('Server started on port 3000 ...');
});
