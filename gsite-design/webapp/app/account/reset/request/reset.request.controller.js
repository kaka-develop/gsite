(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('RequestResetController', RequestResetController);

    RequestResetController.$inject = ['$timeout'];

    function RequestResetController ($timeout) {
        var vm = this;

        vm.error = true;
        vm.errorEmailNotExists = true;
        vm.requestReset = requestReset;
        vm.resetAccount = {};
        vm.success = true;

       

        function requestReset () {

           
        }
    }
})();
