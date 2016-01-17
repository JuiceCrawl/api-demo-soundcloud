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

var soundcloudCtr = angular.module('SoundcloudModule', []);

soundcloudCtr.controller('SoundcloudController', ['$scope', 'generalService', 'RestService', function($scope, generalService, RestService) {
	$scope['generalService'] = generalService;
	$scope.username = '';
	
	$scope.init = function(){
		console.log('SoundcloudController: INIT');

	}

	$scope.fetchSoundcloudTracks = function(){
		console.log('fetchSoundcloudTracks: '+JSON.stringify($scope.username));
		RestService.query({'resource':'soundcloud', 'username':$scope.username}, function(response){
			var list = response.results;
			console.log(JSON.stringify(list));
			$scope.tracks = list;

		});

	}

	
	
	
	
	

}]);





var twilioCtr = angular.module('TwilioModule', []);

twilioCtr.controller('TwilioController', ['$scope', 'generalService', 'RestService', function($scope, generalService, RestService) {
	$scope['generalService'] = generalService;
	$scope.recipient = '';
	$scope.message = '';
	
	$scope.init = function(){
		console.log('TwilioController: INIT');

	}

	
	$scope.sendSMS = function(){
		var phone = $scope.recipient.replace('-', '');
		var phone = phone.replace('-', '');

		var pkg = {'recipient':phone, 'message':$scope.message};
		console.log('SEND SMS:'+JSON.stringify(pkg));

		RestService.post({'resource':'twilio', 'id':null}, pkg, function(response){
			console.log(JSON.stringify(response));

		});




	}
	
	
	

}]);
