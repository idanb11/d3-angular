/* global
 define: false,
 console: false
 */
define([
  'd3',
  './chart'
], function ( d3, Chart ) {
  'use strict';

  return ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        bars: '=',
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;
        var dimensions = { margins: { top: 10, right: 20, bottom: 20, left: 40 } };

        var svg = new Chart(ele[0], dimensions);

        var x = d3.scale.ordinal().rangeRoundBands([0, svg.width()], .1);
        var y = d3.scale.linear().range([svg.height(), 0]);
        var yAxis = d3.svg.axis().scale(y).orient('left');
        var xAxis = d3.svg.axis().scale(x).orient('bottom'); // declare the X axis
        var color = d3.scale.category20(); //builtin range of colors

        scope.$watch('bars', function (newBars) {
          if (newBars != null) scope.render(newBars);
        }, true);

        scope.render = function (data) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {
            x.domain(data.map(function (d) { return d[0]; }));
            y.domain([0, d3.max(data, function (d) { return d[1]; })]);

            var yTicks = [
              d3.min(y.ticks()),
              d3.mean(y.ticks()),
              d3.max(y.ticks())
            ];

            yAxis.tickValues(yTicks);
            svg.append('g')
                  .attr('class', 'y axis')
                  .call(yAxis);

            var barContainers = svg.selectAll('.bar')
                  .data(data)
                .enter().append('g')
                  .attr('class', 'bar')
                  .attr('y', svg.height())
                  .attr('height', 0);

            var bars = barContainers.append('rect')
              .attr('class', 'bar')
              .attr('y', svg.height())
              .attr('height', 0)
              .attr("fill", function(d, i) {  // make each bar have a different random color
                return color(i);
              });

            bars.transition()
              .duration( 500 )
              .delay( function ( d, i ) {
                 return i * 20;
               })
              .attr('x', function(d) { return x(d[0]); })
              .attr('width', x.rangeBand())
              .attr('y', function(d) { return y(d[1]); })
              .attr('height', function(d) { return svg.height() - y(d[1]); });

            // create vars for average line
            var maxValue = d3.max(data, function (d) { return d[1]; });
            var minValue = d3.min(data, function (d) { return d[1]; });
            var avgValue = (maxValue + minValue) / 2;
            var avgLinePosition = svg.height() - (avgValue / maxValue * svg.height());

            // Add line in the middle of max and min values
            svg.append('line')
              .attr("class", "line")
              .attr('stroke', 'red')
              .attr({x1: 0, x2: svg.width(),y1: avgLinePosition , y2: avgLinePosition});

            // Add the X Axis
            svg.append('g')
              .attr("class", "x axis bar-value-label")
              .attr("transform", "translate(0," + svg.height() + ")")
              .style({'font-size': 'x-small', 'text-anchor': 'middle'}) // i made the font smaller so the labels don't overlap
              .call(xAxis);

            var barValueLabel = svg.append('g')
                .attr('transform', 'translate(' + svg.width() / 2 + ', 10)')
              .append('text')
                .attr('class', 'bar-value-label')
                .style('text-anchor', 'middle');

          }, 200); // renderTimeout
        };
      }
    };
  }];
});
