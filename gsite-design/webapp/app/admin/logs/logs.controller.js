(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('LogsController', LogsController);

    LogsController.$inject = ['LogsService'];

    function LogsController(LogsService) {
        var vm = this;

        vm.changeLevel = changeLevel;
        vm.loggers = LogsService.findAll();

        function changeLevel(name, level) {

        }
    }
})();