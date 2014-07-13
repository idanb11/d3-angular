'use strict';

define([
  'angular', 
  'angularResource'
], function (angular) {
	angular.module('myApp.services', ['ngResource'])
		.factory('Pie', function($resource){
      return $resource('app/api/v1/pie.json');
    });
});
