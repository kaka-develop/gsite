(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('RegisterController', RegisterController);


    RegisterController.$inject = ['$translate', 'Auth', 'LoginService'];

    function RegisterController($translate, Auth, LoginService) {
        var vm = this;

        vm.error = null;
        vm.errorUserExists = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.registerAccount = {};
        vm.success = null;

        function register() {
            vm.registerAccount.langKey = $translate.use();
            vm.error = null;
            vm.errorUserExists = null;
            vm.errorEmailExists = null;

            Auth.createAccount(vm.registerAccount).then(function () {
                vm.success = 'OK';
            }).catch(function (response) {
                vm.success = null;
                if (response.status === 400 && response.data === 'login already in use') {
                    vm.errorUserExists = 'ERROR';
                } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                    vm.errorEmailExists = 'ERROR';
                } else {
                    vm.error = 'ERROR';
                }
            });

        }
    }
})();
