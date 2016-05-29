/*jshint -W117 */
/*jshint -W109 */
/*jshint -W098 */
/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'jquery',
    'angular',
    'main',
    'routes',
    'interceptors',
    'px-datasource',
    'ng-bind-polymer',
    'angular-resource',
    'angular-sanitize',
    'dragula',
    'px-timeseries',
    'd3',
    'tweenMax',
    'cssplugin'
], function ($, angular) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'app.routes',
        'app.interceptors',
        'sample.module',
        'predix.datasource',
        'ngSanitize',
        'dragularModule',
        'px.ngBindPolymer',
        'ngResource'
    ]);

    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    predixApp.controller('MainCtrl', ['$scope', '$rootScope', '$state', '$location', 'PredixUserService',
        function ($scope, $rootScope, $state, $location, predixUserService) {

        $scope.navTemplateUrl = 'views/navbar.html';

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (angular.isObject(error) && angular.isString(error.code)) {
                switch (error.code) {
                    case 'UNAUTHORIZED':
                        //redirect
                        predixUserService.login(toState);
                        break;
                    default:
                        //go to other error state
                }
            }
            else {
                // unexpected error
            }
        });
        $rootScope.$state = $state;

        TweenLite.to( CSSRulePlugin.getRule("section:before"), 1, {
            cssRule:{width:'120%', height: '100px', top: '0'},
            delay: 0,
            ease: Linear.easeNone
        });

    }]);

    //Set on window for debugging
    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});
