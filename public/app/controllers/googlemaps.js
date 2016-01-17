var googleMapsCtr = angular.module('GoogleMapsModule', []);

googleMapsCtr.controller('GoogleMapsController', ['$scope', 'generalService', 'RestService', function($scope, generalService, RestService) {
	$scope['generalService'] = generalService;
	$scope.address = '';
	
	$scope.init = function(){

	}

	$scope.geocode = function(){
		RestService.query({'resource':'googlemaps', 'address':$scope.address}, function(response){
//			console.log('GoogleMapsController:' + JSON.stringify(response));

			var results = response.results;
			var details = results[0];
			var geometry = details.geometry;
			var location = geometry.location;
//			console.log('GoogleMapsController:' + JSON.stringify(location));

			var latLong = location.lat+','+location.lng;
			fetchVenues(latLong);
		});
	}


	function fetchVenues(latLong){
		RestService.query({'resource':'foursquare', 'll':latLong}, function(response){
			$scope.venues = response.response.venues;
			console.log('FOURSQUARE:' + JSON.stringify($scope.venues));
			

		});

	}

	
	
	
	
	

}]);
