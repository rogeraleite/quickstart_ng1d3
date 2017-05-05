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
    'ngApp.project'
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
      .when('/line-chart', {
        templateUrl: 'views/line-chart.html',
        controller  : 'GeneralController',
        controllerAs: 'line-chart'
      })
      .when('/dc-chart', {
        templateUrl: 'views/dc-chart.html',
        controller  : 'GeneralController',
        controllerAs: 'dc-chart'
      })
      /*
      .when('/force-directed-graph', {
        templateUrl: 'views/force-directed-graph.html',
        controller  : 'GeneralController',
        controllerAs: 'force-directed-graph'
      })
      
      .when('/parallel-coordinates', {
        templateUrl: 'views/parallel-coordinates.html',
        controller  : 'GeneralController',
        controllerAs: 'parallel-coordinates'
      })
      .when('/dc-graphs', {
        templateUrl: 'views/dc-graphs.html',
        controller  : 'GeneralController',
        controllerAs: 'dc-graphs'
      })
      */
      .otherwise({
        redirectTo: '/'
      });
  });
