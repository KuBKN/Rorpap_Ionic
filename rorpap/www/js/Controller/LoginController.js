app.controller('LoginController', ['$scope', '$location', 'LoginService', '$ionicPopup', function($scope,$location,LoginService, $ionicPopup){

	$scope.Login = function(){
		$scope.data.password = CryptoJS.MD5($scope.data.password1).toString();		
		LoginService.loginUser($scope.data).success(function(data) {
           $location.path('/about'); 
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
	};

}]);
