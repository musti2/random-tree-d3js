define(['angular', './sample-module'], function(angular, module) {
    'use strict';

    /**
     * PredixAssetService is a sample service that integrates with Predix Asset Server API
     */
    module.factory('dataService', ['$q', '$resource', function($q, $resource) {
        // var serviceUrl = '//3.185.126.104/share/newData.otd.js';

        var resourceUrl = 'sample-data/flare.json';

        return $resource(resourceUrl, {},
        {
            'read': {
                method: 'GET',
                cache: false,
                isArray: false,
                transformResponse: function(data){
                    return angular.fromJson(data);
                }
            }
        });

    }]);
});