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

// token time length in seconds
var token_expire = 86400;

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
    if (error) return response.status(500).send('There was a problem registering the user: ' + error);

    // Set up a token
    var token = jwt.sign({ id: user._id }, config.web.secret, { expiresIn: token_expire });

    // Send 200 status along with token
    response.status(200).send({ auth: true, token: token });
  });
};

// Verify token on GET
exports.user_token = function(request, response) {
  User.getById(request.userId, function (error, user) {
    // Send 500 status and message if there problem finding the user
    if (error) return response.status(500).send('There was a problem finding the user: ' + error);

    // Send 404 status and message if there is no user
    if (!user) return response.status(404).send('No user found: ' + error);

    // Send 200 status along with user object
    response.status(200).send(user);
  });
};

// User login
exports.user_login = function (request, response) {
  User.getOne(request.body.email, function(error, user) {
    // Send 505 status and message if there is an error
    if (error) response.status(500).send('Error on server.' + error);

    // Send 404 status and message if there is no user
    if (!user) response.status(404).send('No user found.' + error);

    // Encrypt the password
    var passwordIsValid = bcrypt.compareSync(request.body.password, user.password);

    // Send 402 status and remove any existing tokens
    if (!passwordIsValid) response.status(401).send({ auth: false, token: null });

    // Set up a token
    var token = jwt.sign({ id: user._id }, config.web.secret, { expiresIn: token_expire });

    // Send 200 status along with token
    response.status(200).send( { auth: true, token: token } );
  });
};

// User logout
exports.user_logout = function (request, response) {
  // Send 200 status along removing the token
  response.status(200).send({ auth: false, token: null });
};
