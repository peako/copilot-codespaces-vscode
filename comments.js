// Create web server
// Start server: node comments.js
// Test: curl http://localhost:3000/comments
// Test: curl http://localhost:3000/comments/1

// Load express module
var express = require('express');

// Create express app
var app = express();

// Load body parser module
var bodyParser = require('body-parser');

// Load comments module
var comments = require('./comments');

// Load cors module
var cors = require('cors');

// Load logger module
var logger = require('morgan');

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Use logger
app.use(logger('dev'));

// Get all comments
app.get('/comments', function(req, res) {
  res.json(comments.getAll());
});

// Get comment by id
app.get('/comments/:id', function(req, res) {
  var comment = comments.get(req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Create new comment
app.post('/comments', function(req, res) {
  var comment = comments.add(req.body);
  res.json(comment);
});

// Update comment
app.put('/comments/:id', function(req, res) {
  var comment = comments.update(req.params.id, req.body);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Delete comment
app.delete('/comments/:id', function(req, res) {
  if (comments.remove(req.params.id)) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Start server
app.listen(3000, function() {
  console.log('Comments server listening on port 3000!');
});