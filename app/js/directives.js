'use strict';

define([
	'angular', 
	'directives/d3-bar-chart',
	'directives/d3-line-chart',
	'directives/d3-pie-chart'
], function(angular, D3BarChart, D3LineChart, D3PieChart) {
	angular.module('myApp.directives', [])
	  .directive('d3BarChart', D3BarChart)
	  .directive('d3LineChart', D3LineChart)
	  .directive('d3PieChart', D3PieChart);
});
