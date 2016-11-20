angular.module('localert.maps', ['localert.auth', 'localert.services', 'uiGmapgoogle-maps'])

.controller('MapCtrl', function ($scope,  $location, $window, Auth, uiGmapGoogleMapApi) {
  uiGmapGoogleMapApi.then(function(maps) {
    $scope.position = {latitude: 37.7836,longitude: -122.4112};
    $scope.map = { center: $scope.position, zoom: 8 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        $scope.$apply(function(){
          $scope.position = position;
        });
      });
    }
  });


})