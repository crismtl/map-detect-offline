// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMap', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  });
})

.controller('MapCtrl', function($scope, $cordovaGeolocation, $cordovaNetwork, $rootScope, $ionicLoading) {
  console.log('En MapCtrl');
  var posOptions = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  $scope.coord = {};

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function(position) {
      $scope.coord.lat = position.coords.latitude
      $scope.coord.long = position.coords.longitude
    }, function(err) {
      console.log('error', err);
    });

// TODO: refactorizar con servicio o factory las funciones de network
  $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
    $ionicLoading.hide();
    console.log('con conexión');
    var onlineState = networkState;
    console.log('event', event);
    console.log('networkState', networkState);
    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    };

    $scope.coord = {};

    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function(position) {
        $scope.coord.lat = position.coords.latitude
        $scope.coord.long = position.coords.longitude
      }, function(err) {
        console.log('error', err);
      });
  })

  $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
    $ionicLoading.show({
      template: 'You must be connected to the Internet to view this map.'
    });
    var offlineState = networkState;
    console.log('event', event);
    console.log('networkState', networkState);
    if (networkState === 'none') {
      console.log('se te fue el inter');
    }
  })
})
