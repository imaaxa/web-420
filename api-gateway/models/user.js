/*
  Title: API Gateway Part II
  Author: Cory Gilliam
  Date: Nov 4, 2019
  Modified By:
  Description: Create user model
*/

/**
 * Fields Username, password, and email
*/
var mongoose   = require('mongoose');
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});
var User = module.exports = mongoose.model('User', userSchema);

/**
 * Database queries
*/

/**
 * add user
 * user.save is used to add a new user in our database
 */
module.exports.add = (user, callback) => {
  user.save(callback);
};

/**
 * user by id
 * Retrieves a user of given id
 */
module.exports.getById = (id, callback) => {
  var query = {_id: id};
  User.findById(query, callback);
};

/**
 * user by id
 * Retrieves a user of given id
 */
module.exports.getById = (id, callback) => {
  var query = { _id: id };
  User.findById(query, callback);
};

/**
 * user by email
 * Retrieves a user of given email
 */
module.exports.getOne = (email, callback) => {
  var query = { email: email };
  User.findOne(query, callback);
};
