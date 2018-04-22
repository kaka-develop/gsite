(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('ResetFinishController', ResetFinishController);

    ResetFinishController.$inject = ['$stateParams', '$timeout' , 'LoginService'];

    function ResetFinishController ($stateParams, $timeout, LoginService) {
        var vm = this;

        vm.keyMissing = angular.isUndefined($stateParams.key);
        vm.confirmPassword = true;
        vm.doNotMatch = true;
        vm.error = true;
        vm.finishReset = finishReset;
        vm.login = LoginService.open;
        vm.resetAccount = {};
        vm.success = true;

       

        function finishReset() {
           
        }
    }
})();
