
angular.module('localert.contacts', ['localert.services', 'uiGmapgoogle-maps'])

.controller('ContactCtrl', function ($scope, Contacts, $location) {
  $scope.add = {};
  $scope.contacts;
  $scope.addContact = function() {
    Contacts.storeContacts($scope.add).success(function (responseData) {
        console.log('responseData from addContact', responseData)
        if(responseData.status >= 400){
            console.log('responseError', responseData.statusText)
        }
        $location.path('/')
      }).error(function (error) {
        console.log('Error saving contacts: ', error)
      })
  } 
  $scope.showContacts = function () {
    Contacts.fetchContacts().success(function (responseData) {
        console.log('responseData.data from showcontacts', responseData)
        if(responseData.status >= 400){
            console.log('responseError', responseData.statusText)
          }
          $scope.contacts = responseData;
        }).error(function (error) {
          console.log('Error while fetching contacts');
        });  

  }
  $scope.showContacts();
});
