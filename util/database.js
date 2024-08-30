const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://joshbaon1:zP4s0ysFjhhKf39v@cluster0.gve9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
    .then(client => {
      console.log('Connected');
      callback(client)
    }).catch(err => {
      console.log(err);
    });
}

module.exports = mongoConnect;