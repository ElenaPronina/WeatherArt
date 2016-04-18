angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope, $ionicModal, $timeout, WeatherService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.settingsData = {};

  $scope.WeatherService=WeatherService;

  $scope.temp='f';

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.settingsModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeSettings = function() {
    $scope.settingsModal.hide();
  };

  // Open the login modal
  $scope.settings = function() {
    $scope.settingsModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doSettings = function() {
    console.log('Changing settings', $scope.settingsData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeSettings();
    }, 1000);
  };


$scope.shareData = {};

  $ionicModal.fromTemplateUrl('templates/share.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.shareModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeShare = function() {
    $scope.shareModal.hide();
  };

  // Open the login modal
  $scope.share = function() {
    $scope.shareModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doShare = function() {
    console.log('Changing share', $scope.shareData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeShare();
    }, 1000);
  };

$scope.locationData = {};

  $ionicModal.fromTemplateUrl('templates/location.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.locationModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLocation = function() {
    $scope.locationModal.hide();
  };

  // Open the login modal
  $scope.location = function() {
    $scope.locationModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLocation = function() {
    console.log('Changing location', $scope.locationData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLocation();
    }, 1000);
  };

  $scope.addLocationData = {};

  $ionicModal.fromTemplateUrl('templates/addlocation.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addLocationModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeAddLocation = function() {
    $scope.addLocationModal.hide();
  };

  // Open the login modal
  $scope.addLocation = function() {
    $scope.addLocationModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doAddLocation = function() {
    console.log('Adding location', $scope.addLocationData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeAddLocation();
    }, 1000);
  };


})

.controller('WeatherCtrl', function($scope, $stateParams, $http, WeatherService) {
  var quotes = '{ \
  "quotes": [ \
    {   "quote": "Everybody talks about the weather, but nobody does anything about it.", \
      "author": "Mark Twain"\
    },\
    {   "quote":"One need only think of the weather, in which case the prediction even for a few days ahead is impossible.",\
        "author":"Albert Einstein"\
    },\
      {   "quote":"A change in the weather is sufficient to recreate the world and ourselves.",\
       "author":"Marcel Proust"\
    },\
    {    "quote":"The weather is like the government, always in the wrong.",\
             "author": "Jerome K. Jerome"\
    },\
     {     "quote":"A cloudy day or a little sunshine have as great an influence on many constitutions as the most recent blessings or misfortunes.",\
               "author": "Joseph Addison"\
     }, \
         {     "quote":"Sunshine is delicious, rain is refreshing, wind braces up, snow is exhilarating; there is no such thing as bad weather, only different kinds of good weather.",\
                "author": "John Ruskin"\
     }, \
     {      "quote":"Do not knock the weather. If it did not change once in a while, nine out of ten people could not start a conversation.",\
                "author": "Kin Hubbard"\
     }, \
     {      "quote":"Weather forecast for tonight: Dark. Continued dark overnight, with widely scattered light by morning.",\
                "author": "George Carlin"\
     }, \
     {     "quote":"Climate is what we expect, weather is what we get.",\
                "author": "Mark Twain"\
     }, \
         {     "quote":"Bad weather always looks worse through a window.",\
               "author": "Tom Lehrer"\
     }, \
     {      "quote":"You can not get mad at weather because weather is not about you. Apply that lesson to most other aspects of life.",\
                "author": "Doug Coupland"\
     }, \
     {      "quote":"There is no such thing as bad weather, just soft people.",\
                "author": "Bill Bowerman"\
     }, \
         {     "quote":"Wherever you go, no matter what the weather, always bring your own sunshine.",\
               "author": "Anthony J.D Angelo"\
     }, \
        {       "quote":"If you want to see the sunshine, you have to weather the storm.",\
                "author": "Frank Lane"\
     }, \
         {      "quote":"You are the sky. Everything else - it is just the weather.",\
                "author": "Pema Chodron"\
     }, \
         {      "quote":"Who cares about the clouds when we are together? Just sing a song and bring the sunny weather.",\
                "author": "Dale Evans"\
     } \
   ]\
  }';

  var quote=JSON.parse(quotes);
  var i = Math.floor(Math.random()*16);
  $scope.quote=quote.quotes[i].quote;
  $scope.author=quote.quotes[i].author;

  $scope.backgroundImage = "img/wind.jpg";

  $scope.citywoeid = $stateParams.citywoeid;
  $scope.cityname = $stateParams.cityname;

  var refreshWeather=function(){
      WeatherService.getWeather($scope.citywoeid).success(function(data) {
      $scope.forecast = data;
      var conditionCode = data.query.results.channel.item.condition.code;
      var temperature = data.query.results.channel.item.condition.temp;

      $scope.backgroundImage = pickRandomImage(conditionCode, temperature);
    });
  };

  refreshWeather();

  $scope.$watch('WeatherService.temp', refreshWeather);

  var photos=
  {
    clear:['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
    cloudy:['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
    fog:['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg','8.jpg','9.jpg'],
    rain:['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg','9.jpg', '10.jpg'],
    snow:['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
    wind:['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']
  }

  var weatherFromCode = function (code){
    if(code<=12){
      return "rain";
    }
   else if (code<=17){
    return "snow";
     }
     else if (code==18){
       return "rain";
     }
     else if (code<=22){
    return "fog";
     }
     else if (code<=24){
       return "wind";
     }
     else if (code==25){
       return "snow";
     }
    else if (code<=30){
    return "cloudy";
     }
     else if (code<=34){
    return "clear";
     }
    else if (code==35){
       return "rain";
     }
    else if (code==36){
       return "clear";
     }
    else if (code<=40){
       return "rain";
     }
    else if (code<=43){
       return "snow";
     }
     else if (code==44){
      return "cloudy";
     }
     else {
       return "rain";
     }
  };

  var pickRandomImage=function(code, temperature){
    var weatherType = weatherFromCode(code);
    if (temperature<4){
      weatherType = 'snow';
    }

    var listOfImages = photos[weatherType];
    //console.log(listOfImages);

    var imageNumber = Math.floor((Math.random() * listOfImages.length));

    var photo = listOfImages[imageNumber];
    var imagePath="img/" + weatherType +"/"+photo;
    console.log(imagePath);
    return imagePath;
  };
})

.controller('AddCityCtrl', function($scope, $http) {
  $scope.$watch('city', function(value) {
    if (value != null){
      fetch();
    }
  });

  $scope.clearCity=function(){
   $scope.city = null;
  };

  function fetch() {
    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20woeid%2Cname%2Ccountry.content%20from%20geo.places%20where%20text%3D%22"
                + $scope.city
                + "*%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
    .then(function(response) {
      console.log("Add City Ctrl");
      console.log(response.data.query);
      $scope.details = response.data.query.results.place;
    });
  }
});
