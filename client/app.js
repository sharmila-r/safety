angular.module('localert', [

  'localert.home', 'localert.auth', 'ngRoute', 'localert.services', 'localert.maps', 'uiGmapgoogle-maps', 'localert.contacts'
])
.config(function ($routeProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'auth/signin.html',
      controller: 'AuthCtrl'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'AuthCtrl'
    })
    .when('/', {
      templateUrl: 'showHome.html',
      controller: 'HomeCtrl'
    })
    .when('/add-contacts', {
      templateUrl: 'contacts/add-contacts.html',
      controller: 'ContactCtrl'
    })
    .when('/maps', {
      templateUrl: 'maps/map.html',
      controller: 'MapCtrl'
    })
    .when('/addToTrustnet', {
      templateUrl: 'contacts/addTo.html',
      controller: 'ContactCtrl'
    })
    $httpProvider.interceptors.push('AttachTokens');

    uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCT-cb1ii4EDJwsvttlE36vBbNGMHLdKxw',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    
})

.factory('AttachTokens', function ($window) {
 
  var attach = {
    request: function (object) {

      var jwt = $window.localStorage.getItem('localert.token');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      var username = $window.localStorage.getItem('localert.username');
      if(username){
        object.headers['x-username'] = username;
        // console.log('req object :', object);
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
 
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
})


