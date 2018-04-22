(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('MetricsService', MetricsService);

    MetricsService.$inject = ['$rootScope', '$http'];

    function MetricsService ($rootScope, $http) {
        var service = {
            getMetrics: getMetrics,
            threadDump: threadDump
        };

        return service;

        function getMetrics () {
           
        }

        function threadDump () {
            
        }
    }
})();
