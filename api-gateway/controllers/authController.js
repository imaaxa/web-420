/*
  Title: API Gateway Part III
  Author: Cory Gilliam
  Date: Nov 4, 2019
  Modified By:
  Description: Create user controler
*/

var User   = require('../models/user');
var jwt    = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Register a new user on POST
exports.user_register = function (request, response) {
  // Hash the given password
  var hashedPassword = bcrypt.hashSync(request.body.password, 8);

  // Create a new user object
  var newUser = new User({
    username: request.body.username,
    password: hashedPassword,
    email: request.body.email
  });

  // Add new user if there are no errors
  User.add(newUser, (error, user) => {
    // Send 505 status and message if there is an error
    if (error) return response.status(500).send('There was a problem registering the user. ' + error);

    // Set a 24-hour token
    var token = jwt.sign({ id: user._id }, config.web.secret, {
      expiresIn: 86400
    });

    // Send 200 status along with token
    response.status(200).send({ auth: true, token: token });
  });
};

// Verify token on GET
exports.user_token = function(request, response) {
  // Get the token
  var token = request.headers['x-access-token'];

  // Send 401 status with message if there is not token
  if (!token) return response.status(401).send({ auth: false, message: 'No token provided' });

  // Test the token
  jwt.verify(token, config.web.secret, function (error, decoded) {
    // Send 500 status and message if there is an error
    if (error) return response.status(500).send({ auth: false, message: 'Failed to authenticate token' });

    User.getById(decoded.id, function (error, user) {

      // Send 500 status and message if there problem finding the user
      if (error) return response.status(500).send('There was a problem finding the user');

      // Send 404 status and message if there is no user
      if (!user) return response.status(404).send('No user found');

      // Send 200 status along with user object
      response.status(200).send(user);
    });
  });
};
