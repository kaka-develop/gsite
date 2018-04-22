(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('LogsService', LogsService);

    LogsService.$inject = [];

    function LogsService () {
        var service = {
            findAll: findAll
        };

        function findAll() {
            
        }

        return service;
    }
})();
