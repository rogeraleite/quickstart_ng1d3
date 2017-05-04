'use strict';

/**
 * @ngdoc overview
 * @name prototypeTemplateApp
 * @description
 * # prototypeTemplateApp
 *
 * Main module of the application.
 */
angular
  .module('prototypeTemplateApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngApp.cp-markus'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/cp-markus', {
        templateUrl: 'views/cp-markus.html',
        controller  : 'CPMarkusController',
        controllerAs: 'cp-markus'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
