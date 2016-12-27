var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

// App Configuration
var port = process.env.PORT || 8080;
var router = express.Router();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Create Models
var Application = require('./app/models/application');

// Connect to db
mongoose.connect('mongodb://localhost:27017/application-db');

// Middleware - All Requests
router.use(function(req, res, next) {
  // Logging \o/
  console.log('Request received:', req.method, req.originalUrl);
  next();
})

// Configure Routes
router.get('/', function(req, res) {
  res.json({ message: 'Hello World!'});
});

router.route('/applications')
  // Create an Application
  .post(function(req, res) {
    console.log("Inserting new application: ", req.body);
    var application = new Application();
    application.name = req.body.name;

    // save the Application and check for errors
    application.save(function(err)  {
      if (err)
        res.send(err);

      res.json({ message: 'Application submitted'});
    });
  })
  // Get all applications
  .get(function(req, res) {
    console.log("Getting all applications.");
    Application.find(function(err, applications) {
      if (err)
        res.send(err);

      res.json(applications);
    })
  });

// Register Routes
app.use('/api/v1', router);

// Start server
app.listen(port);
console.log('Server started on port ' + port);
