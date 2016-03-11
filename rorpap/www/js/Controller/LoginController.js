app.controller('LoginController', ['$scope', '$http', '$location', 'LoginService', '$ionicPopup', 'localStorageService', function($scope, $http, $location,LoginService, $ionicPopup, localStorageService) {

		if (localStorageService.isSupported) {
			var user_id = localStorageService.get("user_id");
			if (user_id != null) {
				$location.path('/about');
			}
		}

	$scope.Login = function() {
		$scope.data.password = CryptoJS.MD5($scope.data.password1).toString();
		// LoginService.loginUser($scope.data)
		// .success(function(data) {
        //    $location.path('/about');
        // }).error(function(data) {
        //     var alertPopup = $ionicPopup.alert({
        //         title: 'Login failed!',
        //         template: data
        //     });
        // });

		console.log(JSON.stringify($scope.data));

		$http.post('http://192.168.43.31:8080/api/user/login', $scope.data)
			.success(function(data) {
				if (localStorageService.isSupported) {
					var user_id = data[0]._id;
					localStorageService.set("user_id", user_id);
					$location.path('/about');
				}
				else {
					alert("cannot save to cookie");
				}

			})
			.error(function(data) {
				alert('Username or password incorrect!!!' + data);
			});
	};

}]);
