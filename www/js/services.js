angular.module('starter').service('WeatherService', function($http){

	var methods = {
		temp:'c',
		getWeather : function(cityId){
			var url = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid="
			          + cityId
			          + " and u='"
			          + methods.temp
			          + "' &format=json&env=store://datatables.org/alltableswithkey";
            return $http.get(url);
		}
	};

	return methods;
});
