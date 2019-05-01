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
Promise.promisifyAll(fs);
var db = Promise.promisifyAll(require('./promisification.js'));
var ab = Promise.promisifyAll(require('./promiseConstructor.js'));


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return ab.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(fileData) {
      if (!fileData) {
        throw new Error("ugh");
      } else {
        return fileData;
      }
    })
    .then(function(userName) {
      return db.getGitHubProfileAsync(userName);
    })
    .then(function(profile) {
      // console.log(JSON.stringify(profile));
      return fs.writeFileSync(writeFilePath, JSON.stringify(profile));
    })
  }
  
  // Export these functions so we can test them
  module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
