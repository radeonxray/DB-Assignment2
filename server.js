const http = require('http');
const hostname = '127.0.0.1';
const port = 3001;

var mongoose = require('mongoose');
var mongoDBurl = "mongodb://192.168.33.10:27017/TwitterDB";


var post = require('./model/post');

var express = require('express');
var app = express();
var bodyParser= require('body-parser')

//Body parser for handling JSON
app.use(bodyParser.urlencoded({extended: true}));

//Create the Server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// Connect to the db
monDB = mongoose.connect(mongoDBurl, {useNewUrlParser:true});

//Function to check if we can see the collection of training.1600000.processed.noemoticon
//In the TwitterDB
/*monDB.on('open', function () {
  monDB.db.listCollections().toArray(function (err, collectionNames) {
    if (err) {
      console.log(err);
      return;
    }
      console.log(collectionNames);
      monDB.close();
  });
});
*/


app.get('/api/test', (req,res) => {
console.log("Running");

post.find({user: "_TheSpecialOne_"}, function(err,user){
  if(err){
    res.status(500).send("Error!")
  } else {
    console.log("wha")
    res.status(200).send(user);
  }
})

})

app.get('/api', function (req,res){
  res.send("Here we go!");
})

app.get('/userCount',function(req,res){

post.aggregate([{
  $group:{
    _id:"$user",
    total:{$sum:1}
  }
}]).pipeline().values()

console.log("Done?");


})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
