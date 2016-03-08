app.controller('LoginController', ['$scope', '$http', '$location', 'LoginService', '$ionicPopup', function($scope, $http, $location,LoginService, $ionicPopup){

	$scope.Login = function(){
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

		console.log($scope.data);

		$http.post('http://188.166.180.204:8080/api/user/login', $scope.data)
			.success(function(data) {

                $location.path('/about');
			})
			.error(function(data) {
				alert('Username or password incorrect!!!' + data);
			});
	};

}]);
