(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsiteDialogController', WebsiteDialogController);

    WebsiteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$mdDialog', 'entity', 'Website', 'WebTemplate', 'User'];

    function WebsiteDialogController($timeout, $scope, $stateParams, $mdDialog, entity, Website, WebTemplate, User) {
        var vm = this;

        vm.templates = [];
        vm.users = [];

        vm.website = entity;
        vm.closeDialog = closeDialog;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        vm.sharedUsers = vm.website.sharedUsers;
        vm.share = share;
        vm.deleteUser = deleteUser;


        function closeDialog() {
            $mdDialog.cancel('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.website.id !== null) {
                Website.update(vm.website, onSaveSuccess, onSaveError);
            } else {
                Website.save(vm.website, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {

        }

        function onSaveError() {

        }


        function openCalendar(date) {

        }

        findAllTemplates();

        function findAllTemplates() {
            vm.templates = WebTemplate.all();
        }


        findAllUsers();

        function findAllUsers() {
            vm.users = User.all();
        }

        function share() {
            if (getIndex(vm.email) < 0)
                vm.sharedUsers.push(vm.email);
        }

        function deleteUser(index) {
            vm.sharedUsers.splice(index,1);
        }

        function getIndex(item) {
            return vm.sharedUsers.indexOf(item);
        }
    }
})();