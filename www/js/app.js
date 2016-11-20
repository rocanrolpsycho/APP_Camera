
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
    // AQUI EMPIEZA NUESTRO CANVAS

    var img = new Image();
    img.onload = function(){
      canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas), {
            originX: 'left',
            originY: 'top',
            left: 0,
            top: 0
        });
      };
      img.src = $rootScope.pictureUrl;
    canvas.renderAll();


    // TERMINA CANVAS
})
app.controller('MainCtrl', ['$scope','$rootScope','$webImageSelector', function($scope,$rootScope, $webImageSelector){
  $scope.onActivateWebView = function() {
        var config = {
          searchProviders: [$webImageSelector.searchProviders.Bing]
        };
        $webImageSelector.show(config).then(function(image){
          console.log(angular.toJson(image.image.url));

          // Quitarle las commillas al resultado que regresa en JSON
          var sinComillas = angular.toJson(image.image.url);
          var myImg  = sinComillas.replace(/\"/g, "");

          addImg(myImg);

        });

      }
}])
// funcion para agregar imagenes
function addImg(myImg){
fabric.Image.fromURL(myImg, function(oImg) {
  var l = Math.random() * (150 - 0) + 0;
  var t = Math.random() * (150 - 0) + 0;
      oImg.scale(0.2);
  oImg.set({'left':l});
            oImg.set({'top':t});
      canvas.add(oImg);
  });
}
