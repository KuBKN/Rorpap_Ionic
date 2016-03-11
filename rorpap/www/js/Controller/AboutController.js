app.controller('AboutController', ['$scope', '$location', '$cordovaGeolocation', '$cordovaBackgroundGeolocation', 'localStorageService', function($scope, $location, $cordovaGeolocation, $cordovaBackgroundGeolocation, localStorageService) {

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

					$http.post('http://188.166.43.31:8080/api/tracking/update', tracking)
						.success(function(data) {
							alert("Update OK");
						})
						.error(function(data) {
							alert("Update Failed: " + data);
							console.log("Update Failed: " + JSON.stringify(data));
						});

				}, function(err) {
					alert("Get location Failed");
					console.log("Get location Failed: " + JSON.stringify(err));
				});


		}
	//
	// var options = {
	//     // https://github.com/christocracy/cordova-plugin-background-geolocation#config
	//   };
	//
	// $scope.round = 1;
	// 	console.log($cordovaGeolocation);
	// $cordovaBackgroundGeolocation.configure(options)
    // .then(
    //   null, // Background never resolves
    //   function (err) { // error callback
    //     console.error(err);
    //   },
    //   function (location) { // notify callback
	// 	  var lat  = position.coords.latitude;
	// 	  var long = position.coords.longitude;
	//
	// 	  $scope.round++;
	// 	  console.log(position);
	// 	  $scope.loc = position;
    //   });

	$scope.logout = function() {
		localStorageService.clearAll();
		$location.path('/login');
	}

}]);
