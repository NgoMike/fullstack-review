const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // set schema with properties and value type
  login: String,
  id: Number,
  html_url: String,
});
// repo is a mongoose model and repoSchema
let Repo = mongoose.model('Repo', repoSchema);

let fetch = (callback) => {
  Repo.find( (err, repos) => {
    if (err) {
      console.log(err);
    }
    callback(repos, null); 
  }).limit(25);
}

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // data is a collection of objects
  // loop thru and for each repo obj, save a new Repo model with schema props for each
  data.forEach((repo) => {
    var newRepo = new Repo({
      login: repo.owner.login,
      id: repo.id,
      html_url: repo.html_url,
    });
    // saves to MongoDb
    newRepo.save();
  });

  // for (var i = 0; i < data.length; i++) {
  //   repo.login = data[i].owner.login,
  //   repo.id = data[i].owner.id,
  //   repo.url = data[i].owner.url, 
  //   repo.repos_url = data[i].owner.repos_url    
  // }
}

module.exports.save = save;
module.exports.fetch = fetch;