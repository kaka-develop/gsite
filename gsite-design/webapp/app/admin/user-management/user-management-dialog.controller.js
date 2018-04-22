(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('UserManagementDialogController', UserManagementDialogController);

    UserManagementDialogController.$inject = ['$scope', '$state', '$mdDialog', 'User', 'entity'];

    function UserManagementDialogController($scope, $state, $mdDialog, User, entity) {
        var vm = this;

        vm.closeDialog = closeDialog;
        vm.save = save;
        vm.choose = choose;
        vm.deleteChoice = deleteChoice;

        vm.user = entity;
        vm.profiles = ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'];
        vm.choices = vm.user.authorities;
        

        function closeDialog() {
            $mdDialog.cancel();
        }

        function save() {
            vm.isSaving = true;
            if (vm.user.id !== null) {
                User.update(vm.user);
            } else {
                User.save(vm.user);
            }
            $mdDialog.hide();
            $state.go('user-management');
        }

        function choose() {
            if (getIndex(vm.choice) < 0)
                vm.choices.push(vm.choice);
        }

        function getIndex(choice) {
            return vm.choices.indexOf(choice);
        }

        function deleteChoice(index) {
            vm.choices.splice(index, 1);
        }

    }
})();