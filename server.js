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
//Find the top 10 users with most links
//The Users "mention" each other in the "text"-element, by @[username]
//Need to find the top 10 users, who has the most @[username]
//Need to use $regex?
//Need to use $regex to search for @[username] and end at first "space", count the mentions and return the top 10
//Added a new field to keep track of mentions!
app.get('/mostlinks', function(req,res){

  post.aggregate([
  {'$match':{'text':{'$regex':/@\w+/}}}, {'$addFields': {"mentions":1}},{'$group':{"_id":"$user", "mentions":{'$sum':1}}}, {'$sort':{"mentions":-1}}, ]).
  limit(10).allowDiskUse(true).exec(function(err,user){
    if(err){
      res.status(500).send("Error!")
    } else {
      console.log("wha")
      res.status(200).send(user);
    }
  })

  })


//API for showing the top 10 most mentioned Twitter users
//Need to locate and save the usernames 

app.get('/mostmentioned', function(req,res){

  post.aggregate([
    {'$addFields': {'words':{'$split':['$text', ' ']}}},
    {'$unwind':"$words"}, 
    {'$match':{'words':{'$regex':/@\w+/,'$options':'m'}}}, 
    {'$group':{'_id':"$words",'total':{'$sum':1}}},
    {'$sort':{'total':-1}} 
]).limit(5).allowDiskUse(true).exec(function(err,result){
  if(err){
    res.status(500).send("Error: " + err.name)
  } else {
    res.status(200).send(result);
  }
})

})

  //API to count the Top 10 Most Active users
  //The query is based on counting the "user"-field of all the users, sort it from high to low and limit the result to the top 10.
  //Query seems to fail, if I try to replace the "_id" with something more fitting, like "name" or "username", err message states that: The field \'_username\' must be an accumulator object.
  //WARNING: Can (potentially) be slow! Putting the "limit(10)" REALLY helped the speed/response!
  //WARNING WARNING! Don't remove the "limit(10)"! Unless you REALLY want to see the result for ALL users, in which case: Start the function, brew some cofee, and come back (:
  //NOTE: "allowDiskUse(true)" was originally set when I tested for ALL users, since the query needed to use more memory than was available (Think default allowed is 100mb).
  app.get('/mostactive', function(req,res){
   
  post.aggregate([{'$group':{
    _id:"$user",count:{$sum:1}}},
    {$sort:{count:-1}}
  ]).allowDiskUse(true).limit(10).exec(function(err, user){
    if(err){
      console.log(err)
      res.status(500).send("Error!")
    } else {
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

//TEST API!
//Just wanted to see if any user had any text in the field "query" other than "NO_QUERY"
//Spoiler: None!
app.get('/testQuery', function(req,res){

  post.aggregate([{'$group':
  {_id:{query:"$query"}, count:{$sum:1}}},
  {$sort:{"_id.source":-1}}]).allowDiskUse(true).limit(10).exec(function(err, user){
    if(err){
      console.log(err)
      res.status(500).send("Error!")
    } else {
      res.status(200).send(user);
    }
  })

})

//API Polarity
//Show the five users with the most Grumpy tweets and the five users with the most positive tweets
app.get('/negativepolarity', (req,res) => {

  post.aggregate([
    {'$group':{'_id':"$user", 'polarity': {'$avg': "$polarity"}, 'AmountOfNegativeTweets': {'$sum': 1}}},
    {'$sort':{ 'polarity': 1, 'AmountOfNegativeTweets':-1}}
]).limit(5).allowDiskUse(true).exec(function(err,result){
  if(err){
    res.status(500).send("Error: " + err.name)
  } else {
    res.status(200).send(result);
  }
})
})

//API Polarity
//Show the five users with the most Positive tweets and the five users with the most positive tweets
app.get('/positivepolarity', (req,res) => {

  post.aggregate([
    {'$group':{'_id':"$user", 'polarity': {'$avg': "$polarity"}, 'AmountOfHappyTweets': {'$sum': 1}}},
    {'$sort':{ 'polarity': -1, 'AmountOfHappyTweets':-1}}
]).limit(5).allowDiskUse(true).exec(function(err,result){
  if(err){
    res.status(500).send("Error: " + err.name)
  } else {
    res.status(200).send(result);
  }
})
})


  //TEST POLARITY WITH AGGREGATE
  //Testing to see the range of the field "polarity"
  //Results: 
  // 0 : 800000 (one is prob. from the top field)
  // 4 : 800000
  //From the results one must conclude, that some users might have multiple tweets with a polarity score.
  // From Standford : the polarity of the tweet (0 = negative, 2 = neutral, 4 = positive)
  app.get('/polAgg', (req,res) => { 

    post.aggregate([{'$group':{_id:"$polarity",count:{$sum:1}}},{$sort:{count:-1}}]).exec( function(err,user){
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




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
