angular.module('localert.home', ['localert.auth', 'localert.services'])

.controller('HomeCtrl', function ($scope,  $location, $window, Auth, SendAlerts) {
  // if(!Auth.isAuth()){
  //   $location.path('/signin');
  // }
  $scope.signout = function() {
    Auth.signout();
  };

  $scope.sendAlertPanic = function () {
    var alertData = {contactType: 'E'};
    alertData.username = $window.localStorage.getItem('localert.username');
    SendAlerts.postAlert(alertData).success(function (data) {
      console.log('data in SendPanic : ',data)
    }).error(function (err) {
     console.log('error in SendPanic', err);
    });
  };

  $scope.sendAlertHelp = function () {
    var alertData = {contactType: 'H'};
    alertData.username = $window.localStorage.getItem('localert.username');
    SendAlerts.postAlert(alertData).success(function (data) {
      console.log('data in SendHelp : ',data)
    }).error(function (err) {
      console.log('error in SendHelp', err);
    });
  };

  $scope.sendAlertTalk = function () {
    var alertData = {contactType: 'T'};
    alertData.username = $window.localStorage.getItem('localert.username');
    SendAlerts.postAlert(alertData).success(function (data) {
      console.log('data in SendTalk : ',data)
    }).error(function (err) {
      console.log('error in SendTalk', err);
    });
  }
})