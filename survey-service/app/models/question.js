/**
 * Created by Andrew Bell 12/26/2016
 * www.recursivechaos.com
 * andrew@recursivechaos.com
 * Licensed under MIT License 2016. See license.txt for details.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: String
});

module.exports = mongoose.model('Question', QuestionSchema);
