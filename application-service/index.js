var express = require('express');
var app = express();

// Set port
var port = process.env.PORT || 8080;

var router = express.Router();

// Configure Routes
router.get('/', function(req, res) {
  res.json({ message: 'Hello World!'});
});

// Register Routes
app.use('/api/v1', router);

// Start server
app.listen(port);
console.log('Server started on port ' + port);
