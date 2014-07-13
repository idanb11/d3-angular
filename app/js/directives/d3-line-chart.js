/* global
 define: false,
 console: false
 */
define([
  'd3',
  './chart'
], function (d3, Chart) {
  'use strict';

  return ['$timeout', function ($timeout) {

    function yScaleMin(dataMin, baseline) {
      if (!baseline || dataMin < baseline) {
        return 0
      } else {
        return (Math.round(baseline * 10) - 1) / 10.0
      }
    }

    return {
      restrict: 'E',
      scope: {
        lines: '='
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;

        var dimensions = {
          margins: { top: 10, right: 20, bottom: 10, left: 45 }
        };

        var graph = new Chart(ele[0], dimensions);

        scope.$watch('lines', function (newLines) {
          if (newLines != null) {
            scope.render(newLines)
          };
        }, true);

        scope.render = function (newLines) {
          graph.selectAll('*').remove();

          if (!newLines) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {
            var data = newLines[0];

            graph.xScale.domain([
              d3.min(data, function (d) {
                return d[0];
              }),
              d3.max(data, function (d) {
                return d[0];
              })
            ]);
            graph.yScale.domain([
              d3.min(data, function (d) {
                return d[1];
              }),
              d3.max(data, function (d) {
                return d[1];
              })
            ]);

            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(graph.yScale).orient('left').tickValues(graph.yScale.ticks());
            // Add the y-axis
            graph.append('g')
              .attr('class', 'y axis')
              .call(yAxisLeft)
              .attr('transform', 'translate(-10,0)');

            // create a line function that can convert data[] into x and y points
            var line = d3.svg.line()
              .x(function (d) {
                return graph.xScale(d[0]);
              })
              .y(function (d) {
                return graph.yScale(d[1]);
              });

            // add line
            graph.append('path')
              .attr('d', line(data))
              .attr('stroke', 'red');
          }, 200); // renderTimeout
        };
      }
    };
  }]
});
