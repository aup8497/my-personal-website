var Twit = require('twit')
var express=require('express');
var request = require('request');
var router = express.Router();


var T = new Twit({
  consumer_key:         'zkajjNReeAMWwVgp1FSHAT2cK',
  consumer_secret:      'Djv3mm2JSEL9Omc3hq78zk8YSGr8cglGAl9UIX58vu0CYosAaF',
  access_token:         '806386679598710784-AGi1WKa3HqBg0pC19K6QlkKQL9BRYLB',
  access_token_secret:  'KHB3V08pFYfg3fU2Fawr0qspQoXaODWFWoSXMmb6V7nTO',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})

var app = express();

//Setup rotuing for app
app.use(express.static(__dirname + '/public'));

var jsonData=[];

app.get('/', function(req, res, next) {
  res.send('There is no html page for this !! Hosted API here');
});


app.get('/tweetsGet',function(req,res){

	console.log("i was called Hurray");
	//req contains the request object 
	//res is used to send data back using res.send
	//next is used when there is an error or something

////this next part,we cant encapsulate the variable within this function,so we make it global by declaring it outside
	// var resData={ coordinates: "1",
 //    place_name: 'Jersey City, NJ',
 //    profile_image_url: 'http://pbs.twimg.com/profile_images/522456926269886464/4j4J0U4T_normal.jpeg',
 //    text: '#jerseycitylawyer Is Global Oil Oversupply On The Horizon? https://t.co/uZBWHn69kX @jdsupra https://t.co/Zs2Ah3aaG4',
 //    source: '<a href="https://dlvrit.com/" rel="nofollow">dlvr.it</a>' };
	// console.log("returning response as "+ resData);
	// // return resData;

	var resData=jsonData;
	jsonData=[];
	return res.json(resData);
	// res.send(JSON.stringify(resData));
	console.log( "coming after return also weird" + resData);

});


// router.route('/tweetsGet')
// .post(function (req, res, next) {
//     // var userId = req.body.userId;
//     // var dto = {
//         // 'userId' : userId
//     // };
//     // mongoHelper.findItem(cons.DBName, cons.ChatsCollection, dto, function (err, results) {
//         // if(!err){
//         	console.log("came inside the get function");

//         	var resData={ coordinates: "1",
//     place_name: 'Jersey City, NJ',
//     profile_image_url: 'http://pbs.twimg.com/profile_images/522456926269886464/4j4J0U4T_normal.jpeg',
//     text: '#jerseycitylawyer Is Global Oil Oversupply On The Horizon? https://t.co/uZBWHn69kX @jdsupra https://t.co/Zs2Ah3aaG4',
//     source: '<a href="https://dlvrit.com/" rel="nofollow">dlvr.it</a>' };
// 	console.log("returning response as "+ resData);

//             res.status(200).json(resData);
//         // } else{
//             // res.status(500).json("Error while Getting the data");
//         // }
//  });


// T.get('search/tweets', { q: 'banana', count: 100 }, function(err, data, response) {
//   console.log(data)
// })


// var stream = T.stream('statuses/sample')
 
// // stream.on('tweet', function (tweet) {
// //   console.log(tweet)
// // })

// request( { url: 'http://developers.lightmetrics.co/api/v2/GetTripEventsVideo?tripid=20170511133723742&driverid=353487070524121&starttime=2017-05-11-13-37-23-776',
//                 headers : {
//                     "x-access-token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2NhbCI6eyJlbWFpbCI6ImFrc2hheXVwY29kZUBsaWdodG1ldHJpY3MuY28iLCJwYXNzd29yZCI6IiQyYSQwOCRGUUlCak1xQk5id3V3aTN0ZG14OHlPaUwyNDczbHZha1hOdVkyLk5MdmcxRFprY1Q2RlMwNiIsImRibmFtZSI6ImRiX3Byb2Nlc3NlZF9jdXN0b21lcnRlc3QifSwiaWF0IjoxNDk2OTI5MDE2LCJleHAiOjE0OTcwMTU0MTZ9.EKKm65ssRt-DZHEY1W25WjPFgEUfv0ZEe64nUwmL8sM",
//                     "acc_name" : "local" ,
//                     "databasename" : "db_processed_customertest"
//                 }
//           } , function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the google web page.
//   }
// });


var stream = T.stream('statuses/filter',{ locations : [-180,-90,180,90] } )
// var stream = T.stream('statuses/filter',{ locations : [-74.1687,40.5722,-73.8062,40.9467] } )
// var stream = T.stream('statuses/filter',{ track: '#apple', language: 'en' } )
stream.on('tweet', function (tweet) {

  // console.log( "\n\nbounding box is  \n" +  tweet.place.bounding_box.coordinates)

  // console.log(  "\n\ncoordinates is  \n" +  tweet.place.bounding_box.coordinates)
  // console.log( tweet.place.bounding_box.coordinates)

  // console.log(tweet);

  jsonData.push(
  {
  	"coordinates" : tweet.place.bounding_box.coordinates ,
  	"place_name" : tweet.place.full_name ,
  	"profile_image_url" : tweet.user.profile_image_url,
  	"text" : tweet.text,
  	"source" : tweet.source 
  }
  	);
  console.log(jsonData);

})

//  
// app.get('https://stream.twitter.com/1.1/statuses/filter.json?locations=-180,-90,180,90',function(req,res,next){
// 	console.log(res);
// });







//using socket io or using angular to get requests from another server running is the only solution



app.listen(process.env.PORT || 5000  , function () {
	console.log('example app listening on port 5000!');
});








//things learnt wihle building this app :
	// Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:5000/tweetsGet. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).
	//this means that you cant call get request from the same server on which you have the api which is handling that get request
module.exports = router;
