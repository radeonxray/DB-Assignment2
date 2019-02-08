const http = require('http');

//Host IP of the server
const hostname = '127.0.0.1';

//Host Port of the Server
const port = 3001;

//Module to handle the Database
var mongoose = require('mongoose');

//URL to the Database
//CHANGE IF YOU ARE USING VALUES OTHER THAN THE DEFAULT ONES!
var mongoDBurl = "mongodb://192.168.33.10:27017/TwitterDB";

//Schema-model to handle the data from the Database
var post = require('./model/post');

//Module for Hosting the Server
var express = require('express');
var app = express();

//Module to handle and parse JSON/text elements  
var bodyParser= require('body-parser')

//Applying the Body-parser to the server
app.use(bodyParser.urlencoded({extended: true}));

//Create the Server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// Connect the server to the db
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

//API to count the amount of users in the DB
//Q: How many Twitter users are in the database?
//Note that using the Distinc-eliminates duplicates! The result is therefore X out of 1600000 documents
app.get('/usercount',function(req,res){
post.distinct('user').exec(function(err,users){
  if(err){
    res.status(500).send("Error!")
  } else {
    console.log(users.length)
    res.send("The amount of (unique) twitter users in the Database is: " + users.length +" (out of 1600000 documents)")
  }
}
)
})

//API Twitters users link
app.get('/mostlinks', function(req,res){

  post.find({user: "_TheSpecialOne_"}, function(err,user){
    if(err){
      res.status(500).send("Error!")
    } else {
      console.log("wha")
      res.status(200).send(user);
    }
  })
  
  })


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

//Polarity - Higest 5 (bad or good?)
app.get('/api/pol', (req,res) => {
  console.log("Running");
  var mySort = {polarity: -1};

  post.find().sort(mySort).limit(5).exec( function(err,user){
    if(err){
      res.status(500).send("Error!")
    } else {
      res.status(200).send(user);
    }
  })
  
  })


  app.get('/api/nq', (req, res) => {
    console.log("nq")
    post.where("query").ne("NO_QUERY").exec(function(err,user){
      if(err){
        res.status(500).send("Error!")
      } else {
        res.status(200).send(user);
      }
    })
  })


app.get('/api', function (req,res){
  res.send("Here we go!");
})


/*
post.aggregate([{
  $group:{
    _id:"$user",
    total:{$sum:1}
  }
}]).pipeline().values()
*/



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
