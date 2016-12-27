/**
 * Created by Andrew Bell 12/26/2016
 * www.recursivechaos.com
 * andrew@recursivechaos.com
 * Licensed under MIT License 2016. See license.txt for details.
 */

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
var Survey = require('./app/models/survey');

// Connect to db
mongoose.connect('mongodb://mongo:27017/jarvis-db');

// Middleware - All Requests
router.use(function(req, res, next) {
  // Logging \o/
  console.log('Request received:', req.method, req.originalUrl);
  next();
});

// Configure Routes
router.route('/status')
  .get(function(req, res) {
    if(mongoose.connection.readyState == 1) {
      res.json({ message: 'OK'});
    } else {
      console.log("Database not ready: ", mongoose.connection.readyState);
      res.status(503).json({ message: 'Unable to access db.'});
    }
});

router.route('/surveys')
  // Create an Survey
  .post(function(req, res) {
    console.log("Creating new survey: ", req.body);
    var survey = new Survey();
    survey.name = req.body.name;

    // save the Survey and check for errors
    survey.save(function(err)  {
      if (err)
        res.send(err);

      res.json(survey);
    });
  })
  // Get all surveys
  .get(function(req, res) {
    console.log("Getting all surveys.");
    Survey.find(function(err, surveys) {
      if (err)
        res.send(err);

      res.json(surveys);
    });
  });

router.route('/surveys/:id')
  // Get the survey with that ID (GET /api/v1/surveys/:id)
  .get(function(req, res) {
    Survey.findById(req.params.id, function(err, survey) {
      if (err)
        res.send(err);

      res.json(survey);
    });
  })

  // Update Survey with that ID
  .patch(function(req, res) {

    // Use our survey model to find
    Survey.findById(req.params.id, function(err, survey) {
      if (err)
        res.send(err);

      // Update survey
      survey.name = req.body.name;

      // save the survey
      survey.save(function(err) {
        if (err)
          res.send(err);

        res.json(survey);
      });

    });
  })
  // Delete survey
  .delete(function (req, res) {
    Survey.remove({
      _id: req.params.id
    }, function(err, survey) {
      if (err)
        res.send(err);

        res.json({ message: req.params.id + " deleted."});
    });
  });

// Register Routes
app.use('/api/v1', router);

// Start server
app.listen(port);
console.log('Server started on port ' + port);
