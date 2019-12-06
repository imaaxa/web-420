var jwt = require('jsonwebtoken');
var config = require('./config');

/**
 * Check the HTTP header for a valid JSON web token
 * @param request
 * @param responce
 * @param next
 */
function checkToken(request, response, next) {
  var token = request.headers['x-access-token'];

  if (!token)
    return response.status(403).send({ auth: false, message: 'No token provided.'});

    jwt.verify(token, config.web.secret, function( error, decoded) {
      if (error)
        return response.status(500).send({ auth: false, message: 'Faile to authenticate token.' });

        request.userId = decoded.id;
        next();
    });
}
module.exports = checkToken;
