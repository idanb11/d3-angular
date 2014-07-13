/* global
 define: false,
 console: false
 */
define([
  'd3'
], function ( d3 ) {
  'use strict';

  function chart(element, dimensions) {
    var _margins = dimensions.margins,
    _width = (dimensions.width || element.offsetWidth) - _margins.left - _margins.right,
    _height = (dimensions.height || element.offsetHeight) - _margins.top - _margins.bottom;

    var  svg = d3.select(element).append('svg')
      .attr('width', _width + _margins.left + _margins.right)
      .attr('height', _height + _margins.top + _margins.bottom)
      .append('g')
      .attr('transform', 'translate(' + _margins.left + ',' + _margins.top + ')');

    svg.height = function (value) {
      if (!arguments.length) return _height;
      _height = value;
      return chart;
    };

    svg.width = function (value) {
      if (!arguments.length) return _width;
      _width = value;
      return chart;
    };

    svg.xScale = d3.scale.linear().range([0, svg.width()]);
    svg.yScale = d3.scale.linear().range([svg.height(), 0]).nice();

    return svg;
  }

  return chart;
});
