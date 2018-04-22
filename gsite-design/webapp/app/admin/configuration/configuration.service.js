(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('ConfigurationService', ConfigurationService);

    ConfigurationService.$inject = ['$filter', '$http'];

    function ConfigurationService ($filter, $http) {
        var service = {
            get: get,
            getEnv: getEnv
        };

        return service;

        function get () {
           
        }

        function getEnv () {
            
        }
    }
})();
