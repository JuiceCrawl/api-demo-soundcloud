var accountService = angular.module('AccountServiceModule', ['RestServiceModule']);

accountService.factory('accountService', ['RestService', function(RestService){
	
	var accountManager = {};
	
	accountManager.checkCurrentUser = function(completion){
		console.log('ACCOUNT SERVICE: Check Current User ');
		RestService.get({resource:'currentuser', id:null}, function(response){
			console.log('ACCOUNT SERVICE RESPONSE == '+JSON.stringify(response));
			
			if (completion != null)
				completion(response);
		});
	};


	accountManager.register = function(profile, completion){
		var required = [{'firstName':'First Name'}, {'lastName':'Last Name'}, {'email':'Email'}];
		var missing = null;
		for (var i=0; i<required.length; i++){
			var field = required[i];
			var key = Object.keys(field)[0];
			
			if (profile[key].length==0){
				checkField(profile, key);
				missing = field[key];
				break;
			}
		}
		
		if (missing != null){
			if (completion != null)
				completion(null, {'message':'Missing '+missing});
			return;
		}
		
		
		if (validateEmail(profile.email)==false) {
			if (completion != null)
				completion(null, {'message':'Invalid Email'});
			return;
		}
		
		
		RestService.post({resource:'profile', id:null}, profile, function(response){
			console.log('ACCOUNT SERVICE RESPONSE == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				if (completion != null)
					completion(null, {'message':response.message});
				return;
			}
			
			if (completion != null)
				completion(response, null);
		});
	};
	
	accountManager.updateProfile = function(profile, completion){
		
		RestService.update({resource:'profile', id:profile.id}, profile, function(response){
			console.log('ACCOUNT SERVICE RESPONSE == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				if (completion != null)
					completion(null, {'message':response.message});
				
				return;
			}

			if (completion != null)
				completion(response, null);
		});
	};

	accountManager.login = function(credentials, completion){
		if (credentials.email.length==0){
			alert("Please enter your email");
			return;
		}

		if (credentials.password.length==0){
			alert("Please enter your password");
			return;
		}
		
		if (validateEmail(credentials.email)==false) {
			alert("Please enter a valid email");
			return;
		}
		
		
		RestService.post({resource:'login', id:null}, credentials, function(response){
			console.log('ACCOUNT SERVICE RESPONSE == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				if (completion != null)
					completion(null, {'message':response.message});
				return;
			}
			
			if (completion != null)
				completion(response, null);
		});
	};
	
	function checkField(profile, fieldId){
		var inputField = document.getElementById(fieldId);
		inputField.style.border = (profile[fieldId].length > 0) ? 'none' : '1px solid red'
	}
	
	
	function validateEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	}
	
	
	return accountManager;
	
}]);
var generalService = angular.module('GeneralServiceModule', []);

generalService.factory('generalService', [function(){
	
	var manager = {};
	
	manager.truncatedText = function(text, limit){
		if (text.length < limit)
			return text;
		
		return text.substring(0, limit)+'...';
	}
	
	
    manager.formattedDate = function(dateStr) {
    	var date = moment(new Date(dateStr)).format('MMM D, YYYY');
    	return date;
    }
	
	
	manager.convertToLinks = function(text) {
		var replaceText, replacePattern1;
 
		//URLs starting with http://, https://
		replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig;
		replacedText = text.replace(replacePattern1, '<a class="colored-link-1" title="$1" href="$1" target="_blank">$1</a>');
 
		//URLs starting with "www."
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a class="colored-link-1" href="http://$2" target="_blank">$2</a>');
		
		return replacedText;
	}
	
	
	
    manager.parseLocation = function(stem) {
    	var resourcePath = location.href.replace(window.location.origin, ''); // strip out the domain root (e.g. http://localhost:8888)
    	var requestInfo = {"page":null, "identifier":null, 'params':{}};

    	// parse out the parameters:
    	var p = resourcePath.split('?');
    	if (p.length > 1){
    		var paramString = p[1];
    		var a = paramString.split('&');
    		var params = {};
    		for (var i=0; i<a.length; i++){
    			var keyValue = a[i].split('=');
    			if (keyValue.length < 1)
    				continue;
    			
    			params[keyValue[0]] = keyValue[1];
    		}
    		
    		requestInfo['params'] = params;
    	}
    	
    	resourcePath = p[0];

    	var parts = resourcePath.split(stem+'/');
    	if (parts.length > 1){
    		var hierarchy = parts[1].split('/');
    		for (var i=0; i<hierarchy.length; i++){
    			if (i==0)
    				requestInfo['page'] = hierarchy[i]

    			if (i==1) 
    			    requestInfo['identifier'] = hierarchy[i];
    			
    		}
    	}

    	return requestInfo;
    }
	
	
	
	return manager;
	
}]);
var restService = angular.module('RestServiceModule', ['ngResource']);

restService.factory('RestService', ['$resource', function($resource){
	return $resource('/api/:resource/:id', {}, {
		
		query: { method:'GET', params:{}, isArray:false },
		get: { method:'GET'},
		post: { method:'POST'},
		put: { method:'PUT'},
		update: { method:'PUT' }
		
		// override methods:
	  // { 'get':    {method:'GET'},
	  //   'save':   {method:'POST'},
	  //   'query':  {method:'GET', isArray:true},
	  //   'remove': {method:'DELETE'},
	  //   'delete': {method:'DELETE'} };
		
    });
}]);