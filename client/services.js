angular.module('localert.services',[])

.factory('SendAlerts' , function ($http, $window, $location) {
  var postAlert = function(alertData) {
    return $http({
        method: 'POST',
        url:'/api/sendalert/',
        data: alertData
      });
  };
  return {
    postAlert: postAlert
  };
})

.factory('Contacts' , function ($http, $window, $location) {

  var fetchContacts = function() {
    console.log('In Fetch Contacts');
    return $http({
        method: 'GET',
        url:'/api/contacts',
      });
  };
  var storeContacts = function(contactsData) {
    return $http({
        method: 'POST',
        url:'/api/contacts',
        data: contactsData
    
  });
  }
  return {
    fetchContacts: fetchContacts,
    storeContacts: storeContacts
  };
})

.factory('Auth', function ($http, $location, $window, $rootScope) {
 
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup', 
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('localert.token');
  };

  var signout = function () {
    $window.localStorage.removeItem('localert.token');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
