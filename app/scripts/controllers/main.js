'use strict';

/**
 * @ngdoc function
 * @name prototypeTemplateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the prototypeTemplateApp
 */
angular.module('prototypeTemplateApp')
  .controller('MainCtrl', function () {
  	$("svg").remove();
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
