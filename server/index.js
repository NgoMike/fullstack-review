const express = require('express');
const { save } = require('../database/index.js');
const { getReposByUsername } = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    getReposByUsername(body, (data) => {
      // console.log(typeof data);
      save(data);
    });
      body = JSON.parse(body);
      res.status(201);
      res.send(body.userName);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.send()
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

