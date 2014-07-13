/* global
 define: false,
 console: false
 */

'use strict';

require.config({
	paths: {
		angular:         '../bower_components/angular/angular',
		angularMocks:    '../bower_components/angular-mocks/angular-mocks',
		angularResource: '../bower_components/angular-resource/angular-resource',
		angularUIRouter: '../bower_components/angular-ui-router/release/angular-ui-router',
		d3:              '../bower_components/d3/d3',
	    domReady :       '../bower_components/requirejs-domready/domReady',
		jquery:          '../bower_components/jquery/dist/jquery',
		lodash:          '../bower_components/lodash/dist/lodash.min',
		text:            '../bower_components/requirejs-text/text'
	},
	shim: {
		'angular' : { 
			deps : [
				'domReady',
        		'jquery'
      		],
			exports : 'angular' 
		},
		'angularResource': [ 'angular' ],
		'angularMocks': {
			deps: [ 'angular' ],
			exports :'angular.mock'
		},
		'angularUIRouter' : {
      		deps : [
        		'angular'
      		]
		},
		 d3 : {
      		exports : 'd3'
		},
    	jquery : {
      		exports : '$'
		},
		lodash : {
		  exports : '_'
	    }
	},
	priority: [
		'angular'
	]
});

require(['angular', 'app'], function ( angular, app ) {
  'use strict';

  require(['domReady!'], function ( document ) {
    try {
        angular.bootstrap( document, [app['name']] );
    }
    catch (e) {
        console.error(e.stack || e.message || e);
    }
  });
});
