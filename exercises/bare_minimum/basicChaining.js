/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var promisification = require('../../exercises/bare_minimum/promisification.js');
var promiseConstructor = require('../../exercises/bare_minimum/promiseConstructor.js');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(user => promisification.getGitHubProfileAsync(user))
    .then(body => new Promise((error, success) => {
      fs.writeFile(writeFilePath, JSON.stringify(body), function(err) {
        err !== undefined ? error(err) : done();
      });
    }));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
