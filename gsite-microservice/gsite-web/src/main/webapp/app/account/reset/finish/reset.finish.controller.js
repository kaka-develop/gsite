(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('ResetFinishController', ResetFinishController);

    ResetFinishController.$inject = ['$stateParams', 'Auth', 'LoginService'];

    function ResetFinishController($stateParams, Auth, LoginService) {
        var vm = this;

        vm.keyMissing = angular.isUndefined($stateParams.key);
        vm.confirmPassword = null;
        vm.error = null;
        vm.finishReset = finishReset;
        vm.showLoginDialog = LoginService.open;
        vm.resetAccount = {};
        vm.success = null;

        function finishReset() {
            vm.error = null;

            Auth.resetPasswordFinish({
                key: $stateParams.key,
                newPassword: vm.resetAccount.password
            }).then(function () {
                vm.success = 'OK';
            }).catch(function () {
                vm.success = null;
                vm.error = 'ERROR';
            });

        }
    }
})();
