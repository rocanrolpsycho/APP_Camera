// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova', 'ion-image-search'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller('CameraCtrl', function($scope,$rootScope, $cordovaCamera) {
   $rootScope.pictureUrl = 'http://placehold.it/300x300';
    $scope.takeImage = function() {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
           console.log('camara data is ' + angular.toJson(imageData));
           $rootScope.pictureUrl = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            console.log('camara error is ' + angular.toJson(imageData));
        });
    }
})
app.controller('MainCtrl', ['$scope','$rootScope','$webImageSelector', function($scope,$rootScope, $webImageSelector){
  $scope.onActivateWebView = function() {
        var config = {
          searchProviders: [$webImageSelector.searchProviders.Bing]
        };
        $webImageSelector.show(config).then(function(image){
          console.log(angular.toJson(image.image.url));

          var sinComillas = angular.toJson(image.image.url);

          $rootScope.pictureUrl = sinComillas.replace(/\"/g, "");
        });

      }
}])

 