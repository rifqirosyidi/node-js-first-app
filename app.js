const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// DB Authentication
// mongoose.connect("mongodb://username:password@localhost/dbused?authSource=dbauth&w=1");
mongoose.connect("mongodb://rief:noPassword@localhost/nodekb?authSource=admin&w=1", { useNewUrlParser: true } );
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

// Bosy Parser Middleware parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Set Public Folder Static
app.use(express.static(path.join(__dirname, 'public')));

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

// Add Submit POST Route
app.post('/articles/add', function(req, res) {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(){
      res.redirect('/');
  })
});

// Start Server
app.listen(3000, function() {
  console.log('Server started on port 3000 ...');
});
