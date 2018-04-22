(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('HealthService', HealthService);

    HealthService.$inject = ['$rootScope', '$http'];

    function HealthService ($rootScope, $http) {
        var separator = '.';
        var service = {
            checkHealth: checkHealth,
            transformHealthData: transformHealthData,
            getBaseName: getBaseName,
            getSubSystemName: getSubSystemName
        };

        return service;

        function checkHealth () {
          
        }

        function transformHealthData (data) {
           
        }

        function getBaseName (name) {
          
        }

        function getSubSystemName (name) {
            
        }

        /* private methods */
        function flattenHealthData (result, path, data) {
            
        }

        function addHealthObject (result, isLeaf, healthObject, name) {

           
        }

        function getModuleName (path, name) {
           
        }

        function hasSubSystem (healthObject) {
          
        }

        function isHealthObject (healthObject) {
           
        }

    }
})();
