/*
  Title: API Gateway Part II
  Author: Cory Gilliam
  Date: Oct 22, 2019
  Modified By:
  Description: Create user model
*/

/**
 * Fields Username, password, and email
*/
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});
module.exports = mongoose.model('User', userSchema);

/**
 * Database queries
*/
