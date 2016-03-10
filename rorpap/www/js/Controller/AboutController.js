app.controller('AboutController', ['$scope', '$cordovaGeolocation', '$cordovaBackgroundGeolocation', function($scope, $cordovaGeolocation, $cordovaBackgroundGeolocation, localStorageService) {

	if (localStorageService.isSupported) {
		$scope.user_id = get("user_id");
	}
	else {
		alert("cannot read cookie");
	}

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

		$scope.sendLocation = function() {
			$cordovaGeolocation.getCurrentPosition(posOptions)
				.then(function (position) {
					var lat  = position.coords.latitude;
					var lng = position.coords.longitude;
					var tracking = {user_id: $scope.user_id, date: new Date(), location: lat + "," + lng};

					$http.post('http://188.166.180.204:8080/api/tracking/update', tracking)
						.success(function(data) {
							alert("Update OK")
						})
						.error(function(data) {
							alert("Update Failed: " + data)
						});

				}, function(err) {
					alert("Get location Failed: " + err)
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

}]);
