(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('PasswordController', PasswordController);

    PasswordController.$inject = ['Auth', 'Principal','AlertService'];

    function PasswordController (Auth, Principal,AlertService) {
        var vm = this;

        vm.changePassword = changePassword;
        vm.doNotMatch = null;
        vm.error = null;
        vm.success = null;

        Principal.identity().then(function(account) {
            vm.account = account;
        });

        function changePassword () {
            Auth.changePassword(vm.password).then(function () {
                AlertService.success("OK !")
            }).catch(function () {
                AlertService.error("Error !")
            });
        }
    }
})();
