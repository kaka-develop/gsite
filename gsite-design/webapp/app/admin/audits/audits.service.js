(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .factory('AuditsService', AuditsService);

    AuditsService.$inject = [];

    function AuditsService () {
        var service = {};

        return service;
    }
})();
