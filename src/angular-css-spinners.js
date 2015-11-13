/**
 * angular-css-spinners module
 * Collection of pure css3 spinners (https://github.com/mo3taz-abdallh/angular-css-spinners) for AngularJS
 *
 * Author: Moataz Hammous - https://github.com/mo3taz-abdallh/
 */
'use strict';

angular.module('angular-css-spinners',[]);

angular.module('angular-css-spinners').directive('nestedCircleSpinner', function () {
  return {
    restrict: 'EA',
    templateUrl: 'src/templates/nestedcirclespinner.html'
  };
});


