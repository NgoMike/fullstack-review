const request = require('request');
const config = require('../config.js');


let getReposByUsername = (userName, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  userName = JSON.parse(userName);
  userName = userName.userName;

  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function(err, response, body) {
    if (err) {
      throw err;
    } else {
      callback(JSON.parse(body));
    }
  })
}
  

module.exports.getReposByUsername = getReposByUsername;