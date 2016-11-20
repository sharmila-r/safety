angular.module('localert.auth', ['localert.services'])

.controller('AuthCtrl', function ($scope, $window, $location, Auth) {
  $scope.user = {};
 
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('localert.username', $scope.user.username)
        $window.localStorage.setItem('localert.token', token);
        $location.path('/maps');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('localert.token', token);
        $location.path('/maps');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

});
