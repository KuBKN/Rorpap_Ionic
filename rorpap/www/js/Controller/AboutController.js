app.controller('AboutController', ['$scope', '$cordovaGeolocation', function($scope, $cordovaGeolocation) {

	var posOptions = {timeout: 10000, enableHighAccuracy: false};

	$cordovaGeolocation.getCurrentPosition(posOptions)
		.then(function (position) {
			var lat  = position.coords.latitude;
			var long = position.coords.longitude;
			console.log(position);
			$scope.loc = position;
		}, function(err) {
			console.log(err + "");
			for (var key in err) {
    			alert('key: ' + key + '\n' + 'value: ' + err[key]);
			}
		});
}]);
