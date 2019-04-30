/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      callback(err);
    } else {
      let string = fileData.toString('utf-8');
      let cutoffIndex = string.indexOf('\n');
      callback(err, string.slice(0, cutoffIndex));
    }
  })
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      // console.log(res);
      callback(null, res.statusCode)
    }

  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
