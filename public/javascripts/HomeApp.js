
var app = angular.module('myblog',['duScroll']); // the second and third arguements are the dependencies,which we are adding

app.controller('MainCtrl' ,function ($document,$location,$anchorScroll , anchorSmoothScroll, $scope ){
	
			// $scope.submitNewMeow = function(){
			// 	//console.log($scope.newMeow);//this logs the variable newMeow in the console
			//
			// 	//this next line is sending the data to the server
			// 	$http.post('/meows',{ newMeow: $scope.newMeow }).then(function(){
			// 		alert('succes!!');
			// 		getMeows();//when we submit ,it calls the API again,hence refreshing
			// 		$scope.newMeow='';//after submitting clears the string in the text input
            //
			// 	});
            //
			// }
            //
			// //we are calling removeMeow as a variable(i.e we do scope.removeMeow and not function removeMeow() )and not a function because we are calling it from the front end (and not from the server).
			// //same holds good for 'submitNewMeow()' also.
			// //As we are calling the function 'getMeows()' from the server we are declaring it as a function and not a scope variable
			// $scope.removeMeow = function(deletethismeow){
			// 		$http.put('/meows/remove',{meow: deletethismeow }).then(function(){
			// 		getMeows();//when we submit ,it calls the API again,hence refreshing
            //
			// 	});
			// };
            //
			// $scope.signin = function(){
			// 	$http.put('/users/signin',{username : $scope.username,password : $scope.password })
			// 	.then(function(res){
			// 		console.log(res.data.token);
			// 		$cookies.put('token',res.data.token);
			// 		alert("successfully signed in!");
			// 	},function(err){
			// 		alert("could not sign you in,try again");
            //
			// 	});
            //
			// }
            //
			// function getMeows(){
            //
			// 	$http.get('/meows').then(function(response){
			// 	$scope.meows=(response.data);
			// });//this is an API call
            //
			// }
            //
			// getMeows();
    $scope.skills=[
        "C/C++ , STL",
        "Java",
        "Python",
        "Android",
        "Shell scripting(BASH)",
        "Javascript , NodeJS , AngularJS",
        "SQL , MongoDB",
        "SQL",
        "Git",
        "HTML5, CSS3"
    ]
    $scope.Tools=[
        "Android Studio",
        "WebStorm",
        "PyCharm",
        "Sublime"
    ]

    $scope.gotoElement = function (eID){
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('bottom');

        // call $anchorScroll()
        anchorSmoothScroll.scrollTo(eID);

    };


		});


app.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 1);
        if (speed >= 10) speed = 10;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

});
