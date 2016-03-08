// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngRoute'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($routeProvider, $locationProvider ) {

  $routeProvider.when('/',{
        templateUrl: './views/home.html'
  }).when('/login', {
        controller: 'LoginController',
        templateUrl: './views/login.html'
  }).when('/about', {
        controller: 'AboutController',
        templateUrl: './views/about.html'
  });
});

app.service('LoginService', ['$http', '$q', function($http,$q) {
    return {
        loginUser: function(user) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.post('http://localhost:3000/api/user/login', user)
            .success(function(data) {
              
              console.log(data[0]._id);

                deferred.resolve('Welcome ' + name + '!');  
            })
            .error(function(data) {
              deferred.reject('Wrong credentials.');
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
}]);