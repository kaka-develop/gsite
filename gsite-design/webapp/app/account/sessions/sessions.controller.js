(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('SessionsController', SessionsController);

    SessionsController.$inject = [];

    function SessionsController() {
        var vm = this;

        vm.account = {
            login: 'kaka'
        };
        vm.error = null;
        vm.invalidate = invalidate;

        vm.success = null;

        vm.sessions = [{
            ipAddress: '192.121.212',
            userAgent: 'chrome',
            tokenDate: '2017-03-02'
        }];


        function invalidate(series) {

        }
    }
})();