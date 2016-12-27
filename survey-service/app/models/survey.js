var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  name: String
});

module.exports = mongoose.model('Survey', SurveySchema);
