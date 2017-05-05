 'use strict';

//IMPORTANT
//<!--Last controller loaded presents  ',[]' on its module load-->
angular.module('ngApp.project',[])

.controller('GeneralController', function () {
    console.log("do something")
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });