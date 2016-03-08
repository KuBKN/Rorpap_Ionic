app.controller('LoginController', ['$scope', '$location', function($scope,$location){
	$scope.title = "Submit";

	$scope.Login = function(){
		$location.path('/about');
	};

}]);
