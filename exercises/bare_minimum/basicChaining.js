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

// getGitHubProfileAsync
// pluckFirstLineFromFileAsync

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TO DO
  return new Promise((success, error) => {
    // (1) reads a GitHub username from a `readFilePath`
    // (the username will be the first line of the file)
    promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
      // (2) sends a request to the GitHub API for the user's profile
      .then(function(user) { // user is getting sent in from the success of the prev line
        return promisification.getGitHubProfileAsync(user)
      })
      // (3) writes the JSON response of the API to `writeFilePath`
      .then(function(body){
        fs.writeFile(writeFilePath, JSON.stringify(body), function(err){
          if(err) {
            error(err);
          } else {
            success('success');
            // i had been console logging but we needed to return success()
          }
        });
    });
  })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
