(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('ConfigurationController', ConfigurationController);

    ConfigurationController.$inject = ['$state', '$filter', 'ConfigurationService'];

    function ConfigurationController($state, filter, ConfigurationService) {
        var vm = this;

        vm.allConfiguration = null;
        vm.configuration = null;


    }
})();