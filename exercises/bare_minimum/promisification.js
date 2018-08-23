/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asynchronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = function(user) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };
  return new Promise((success, error) => {
    request.get(options, (err, res, body) => {
      if (err) {
        error(err);
      } else if (body.message) {
        error(new Error('Failed to get GitHub profile: ' + body.message));
      } else {
        success(body);
      }
    });
  });
}


// (2) Asynchronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = () => {
  return new Promise((success, error) => {
    crypto.randomBytes(20, function(err, buffer) {
      if (err) { return error(err); }
      success(buffer.toString('hex'));
    });
  })
}

// (3) Asynchronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

var readFileAndMakeItFunnyAsync; // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};