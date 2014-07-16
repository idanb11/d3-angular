"use strict";

define(['angular', 'services'], function (angular) {

	function linesData ( count ) {
    var lineArray = [];

    for (var i = 0; i < count; i++) {
			var lines = [];
			for (var j = 0; j < 50; j++) {
        lines.push([j++, Math.round(Math.random(100) * 100)]);
			}
			lineArray.push(lines);
		}
		return lineArray;
	}

	return angular.module('myApp.controllers', ['myApp.services'])
		.controller('BarsCtrl', ['$scope', function ( $scope ) {
			$scope.bars = [
				['Monday', Math.random(100)],
				['Tuesday', Math.random(100)],
				['Wednesday', Math.random(100)],
				['Thursday', Math.random(100)],
				['Friday', Math.random(100)]
			];
		}])
		.controller('PiesCtrl', ['$scope', 'Pie', function ( $scope, Pie ) {
        $scope.pie = Pie.query();
		}])
		.controller('LinesCtrl', ['$scope','$document', function ( $scope, $document ) {
      $scope.numberOfLines = 1;
      $scope.sliderSelection = $scope.numberOfLines; // init slider position

      $scope.lines = linesData($scope.numberOfLines);

			$scope.updateLineCount = function () {
        $scope.lines = linesData($scope.numberOfLines);
			};

      $document.foundation({  // init foundation slider and assign callback on change
        slider: {
          on_change: function(){
            // assign new slider position
            $scope.sliderSelection = angular.element(document.getElementById('slider')).attr('data-slider');
            $scope.lines = linesData($scope.sliderSelection);
            if(!$scope.$$phase) {  // call apply after updating $scope.lines outside of angular scope
              $scope.$apply();
            }
          }
        }
      });
		}]);
});
