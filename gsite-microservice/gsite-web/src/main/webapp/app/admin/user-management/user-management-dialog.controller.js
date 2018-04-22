(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('UserManagementDialogController', UserManagementDialogController);

    UserManagementDialogController.$inject = ['$mdDialog', 'entity', 'User', 'LanguageService','Register'];

    function UserManagementDialogController( $mdDialog, entity, User, LanguageService,Register) {
        var vm = this;

        vm.authorities = ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'];
        vm.closeDialog = closeDialog;
        vm.languages = null;
        vm.save = save;
        vm.user = entity;

        vm.choose = choose;
        vm.deleteChoice = deleteChoice;



        LanguageService.getAll().then(function (languages) {
            vm.languages = languages;
        });

        function closeDialog() {
            $mdDialog.cancel();
        }

        function onSaveSuccess(result) {
            vm.isSaving = false;
            $mdDialog.hide(result);
        }

        function onSaveError() {
            vm.isSaving = false;
            vm.message = "User or email is already existed!";
        }

        function save() {
            vm.isSaving = true;
            if (vm.user.id !== null) {
                User.update(vm.user, onSaveSuccess, onSaveError);
            } else {
                Register.save(vm.user, onSaveSuccess, onSaveError);
            }
        }

        function choose() {
            if (getIndex(vm.choice) < 0)
                vm.user.authorities.push(vm.choice);
        }

        function getIndex(choice) {
            return vm.user.authorities.indexOf(choice);
        }

        function deleteChoice(index) {
            vm.user.authorities.splice(index, 1);
        }


    }
})();
