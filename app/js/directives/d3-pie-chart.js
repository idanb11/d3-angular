/* global
 define: false,
 console: false
 */
define([
  'd3',
  './chart'
], function (d3, Chart) {
  'use strict';

  return ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        pie: '='
      },
      link: function (scope, ele, attrs) {
        var renderTimeout;

        var dimensions = {
          margins: { top: 60, right: 0, bottom: 10, left: 0 }
        };
        var svg = new Chart(ele[0], dimensions);
        //var radius = 150;

        var w = 300, //width
          h = 300, //height
          radius = (h+w) / 4,
          totalCount = 0,
          color = d3.scale.category10(); //builtin range of colors

        scope.$watch('pie', function ( newPie ) {
          if (newPie != null) scope.render(newPie);
        }, true);

        scope.render = function ( data ) {
          svg.selectAll('*').remove();

          if (!data) return;
          if (renderTimeout) $timeout.cancel(renderTimeout);

          renderTimeout = $timeout(function () {
            data.forEach(function(item) {
              totalCount += item.count;
            });

            // add legend to the chart
            var legend = d3.select(ele[0])
              .append("svg:svg")
              .attr("width", radius)
              .attr("height", h - h/4)
              .append("svg:g")
              .attr("class", "legend")

              .selectAll("g")
              .data(data)
              .enter().append("g")
              .attr("transform", function(d, i) { return "translate(0," + i * 40 + ")"; });

            legend.append("rect")
              .attr("width", 18)
              .attr("height", 18)
              .attr("fill", function(d, i) { return color(i); } );

            legend.append("text")
              .attr("x", 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .text(function(d, i) { return data[i].bucket; });


            // add pie chart itself
            var chart = d3.select(ele[0])
              .append("svg:svg") //create the SVG element
              .data([data]) //associate our data
              .attr("width", w+ dimensions.margins.left) //set the width and height
              .attr("height", h + dimensions.margins.top)
              .append("svg:g") //make a group to hold the pie chart
              .attr("transform", "translate(" + radius + "," + ((h/2)+dimensions.margins.top) + ")"); //move the center of the pie chart from 0, 0 to radius, radius

            var arc = d3.svg.arc() //this will create <path> elements for us using arc data
              .outerRadius(radius);

            var pie = d3.layout.pie() //this will create arc data
              .value(function(d) { return d.count; }); //access the value of each element in our data array

            var arcs = chart.selectAll("g.slice") // selects all <g> elements with class slice
              .data(pie) //associate the generated pie data
              .enter()
              .append("svg:g") //create a group to hold each slice
              .attr("class", "slice")
              .on("mouseover", function() {
                d3.select(this).select("text")
                  .transition().duration(200)
                  .style("opacity", 1); // show text
              })
              .on("mouseout", function() {
                d3.select(this).select("text")
                  .transition().duration(200)
                  .style("opacity", 0); // hide text
              });

            arcs.append("svg:path")
              .transition()
              .duration(200).attr("fill", function(d, i) { return color(i); } ) //set the color for each slice
              .attr("d", arc); // create the  SVG path

            arcs.append("svg:text") //add a label to each slice
              .attr("transform", function(d) { //set the label's position
                d.innerRadius = 0;
                d.outerRadius = radius;
                return "translate(" + arc.centroid(d) + ")";
              })
              .attr("text-anchor", "middle") //center the text on it's origin
              .text(function(d, i) { return Math.round(data[i].count / totalCount * 100) + "%"; }) //set the label for each slice
              .style("opacity", 0);

            // add title to pie chart
            chart.append("text")
              .attr("x", 0)
              .attr("y", 0 - (h / 2) - (dimensions.margins.top/2))
              .attr("text-anchor", "middle")
              .style("font-size", "x-large")
              .text("Misclassification");

          }, 200); // renderTimeout
        };
      }
    };
  }];
});
