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




