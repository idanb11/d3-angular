'use strict';

define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularUIRouter',
  'angularAnimate'
	], function ( angular, filters, services, directives, controllers ) {	
		return angular.module('myApp', [
			'ui.router',
			'myApp.filters',
			'myApp.services',
			'myApp.directives',
			'myApp.controllers',
      'ngAnimate'
		]).config(['$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider ) {
      $urlRouterProvider.otherwise('/dashboard');
      $stateProvider.
          state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/partials/dashboard.html'
          }).
          state('bars', {
            url: '/bars',
            templateUrl: 'app/partials/bars.html',
            controller: 'BarsCtrl'
          }).
          state('pies', {
            url: '/pies',
            templateUrl: 'app/partials/pies.html',
            controller: 'PiesCtrl'
          }).
          state('lines', {
            url: '/lines',
            templateUrl: 'app/partials/lines.html',
            controller: 'LinesCtrl'
          });
		}]);
});
