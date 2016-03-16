// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic.service.core', 'ngRoute', 'ngCordova', 'LocalStorageModule', 'RequestsService'])
.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {

        // var pushNotification = window.plugins.pushNotification;

        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }



        // pushNotification.register(
        //     onNotification,
        //     errorHandler,
        //     {
        //         'badge': 'true',
        //         'sound': 'true',
        //         'alert': 'true',
        //         'ecb': 'onNotification',
        //         'senderID': '83591773697',
        //     }
        // );
    });
});

// window.onNotification = function(e) {
//     console.log(e);
//
//     switch(e.event) {
//         case 'registered':
//             if (e.regid.length > 0) {
//
//                 var device_token = e.regid;
//                 RequestsService.register(device_token).then(function(response) {
//                     alert('registered!');
//                 });
//             }
//             break;
//         case 'message':
//             alert('msg received: ' + e.message);
//             /*
//             {
//                 "message": "Hello this is a push notification",
//                 "payload": {
//                     "message": "Hello this is a push notification",
//                     "sound": "notification",
//                     "title": "New Message",
//                     "from": "813xxxxxxx",
//                     "collapse_key": "do_not_collapse",
//                     "foreground": true,
//                     "event": "message"
//                 }
//             }
//             */
//             break;
//         case 'error':
//             alert('error occured');
//             break;
//
//     }
// };
//
// window.errorHandler = function(error) {
//     alert('an error occured');
// };



app.config(function($routeProvider, $locationProvider, localStorageServiceProvider) {
    // https://github.com/grevory/angular-local-storage
    localStorageServiceProvider
    .setPrefix('rorpap')
    .setStorageType('localStorage')
    .setStorageCookieDomain('rorpap');

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

app.service('LoginService', ['$http', '$q', function($http, $q) {
    return {
        loginUser: function(user) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.post('http://188.166.180.204:8080/api/user/login', user)
            .success(function(data) {

                console.log(data[0]._id);

                deferred.resolve('Welcome ' + name + '!');
            })
            .error(function(data) {
                deferred.reject(data);
            });

            promise.success = function(fn) {
                console.log("1" + fn);
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                console.log("2" + fn);
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
}]);
