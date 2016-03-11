app.controller('AboutController', ['$scope', '$http', '$location', '$cordovaGeolocation', 'localStorageService', function($scope, $http, $location, $cordovaGeolocation, localStorageService) {

	if (localStorageService.isSupported) {
		$scope.user_id = localStorageService.get("user_id");
	}
	else {
		alert("cannot read cookie");
	}

	var posOptions = {timeout: 10000, enableHighAccuracy: false};

	$cordovaGeolocation.getCurrentPosition(posOptions)
		.then(function (position) {
			var lat  = position.coords.latitude;
			var long = position.coords.longitude;
			console.log("getCurrentPosition" + JSON.stringify(position));
			$scope.loc = position;
		}, function(err) {
			console.log("getCurrentPosition" + JSON.stringify(err));
			for (var key in err) {
    			alert('key: ' + key + '\n' + 'value: ' + err[key]);
			}
		});

	$scope.sendLocation = function() {
		$cordovaGeolocation.getCurrentPosition(posOptions)
			.then(function (position) {
				var lat  = position.coords.latitude;
				var lng = position.coords.longitude;
				var tracking = {user_id: $scope.user_id, date: new Date(), location: lat + "," + lng};

				console.log("Sending... " + JSON.stringify(tracking));

				$http.post('http://192.168.43.31:8080/api/tracking/update', tracking)
					.success(function(data) {
						console.log("ok " + JSON.stringify(data));
						alert("Update OK " + data);
					})
					.error(function(data) {
						alert("Update Failed: " + data);
						console.log("Update Failed: " + JSON.stringify(data));
					});

			}, function(err) {
				alert("Get location Failed");
				console.log("Get location Failed: " + JSON.stringify(err));
			});


	};

	$scope.logout = function() {
		localStorageService.clearAll();
		$location.path('/login');
	}

}]);
