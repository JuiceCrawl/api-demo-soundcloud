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
