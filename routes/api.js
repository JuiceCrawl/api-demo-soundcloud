var express = require('express');
var request = require('request');
var router = express.Router();

router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	if (resource == 'twilio'){
		var pkg = req.body;
		var client = require('twilio')('AC817c36f0cdb7e4d489c5e2586a149095', 'fd2430d88835fab8df742d83818eafbd');

		client.sendMessage({ //Send an SMS text message
//		    to:'+12037227160', // Any number Twilio can deliver to
		    to:'+1'+pkg['recipient'], // Any number Twilio can deliver to
		    from: '+16467130087', // A number you bought from Twilio and can use for outbound communication
		    body: pkg['message'] // body of the SMS message

		}, function(err, responseData) { //this function is executed when a response is received from Twilio
			if (err){
				res.json({'confirmation':'fail', 'message':err});
				return;
			}

	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

			res.json(responseData);
			return;
		});
	}
});

/* GET users listing. */
router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	if (resource == 'soundcloud'){
		var username = req.query.username;
		var url = 'http://api.soundcloud.com/users/'+username+'/tracks.json?client_id=93a0f7b43878c14ce18c92c4e84a4468';
		
		console.log('SOUNDCLOUD REQUEST: '+JSON.stringify(req.query));
//		var url = 'http://api.soundcloud.com/users/thefullstack/tracks.json?client_id=93a0f7b43878c14ce18c92c4e84a4468';

		request.get(url, function (error, response, body) {
			console.log(body)
			if (!error && response.statusCode == 200) {
				res.send(JSON.parse('{\"results\":'+body+'}'));
				return;
		    }
		});

		return;



	}


	if (resource == 'googlemaps'){
		var address = req.query.address;
		console.log('ADDRESS: '+JSON.stringify(req.query));

		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBOnKfCyzPsBNoStmLuQyOeLEj2FcSWNX0';

		request.get(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.json(JSON.parse(body));
				return;
		    }
		});

		return;
	}


	if (resource == 'foursquare'){
//		var latLng = '40.7,-74';
		var latLng = req.query.ll;
		var url = 'https://api.foursquare.com/v2/venues/search?ll='+latLng+'&client_id=VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD&client_secret=UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ&v=20151215';

		request.get(url, function (error, response, body) {
			if (error != null){
				res.json({'confirmation':'fail', 'message':error});
				return;
			}

			res.json(JSON.parse(body));
			return;
		});

		return;
	}

	if (resource == 'twilio'){
		var client = require('twilio')('AC817c36f0cdb7e4d489c5e2586a149095', 'fd2430d88835fab8df742d83818eafbd');

		client.sendMessage({ //Send an SMS text message
		    to:'+12037227160', // Any number Twilio can deliver to
		    from: '+16467130087', // A number you bought from Twilio and can use for outbound communication
		    body: 'word to your mother.' // body of the SMS message

		}, function(err, responseData) { //this function is executed when a response is received from Twilio
			if (err){
				res.json({'confirmation':'fail', 'message':err});
				return;
			}

	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

			res.json(responseData);
			return;
		});
	}
});



module.exports = router;
