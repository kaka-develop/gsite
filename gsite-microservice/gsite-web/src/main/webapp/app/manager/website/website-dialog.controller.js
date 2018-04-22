(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsiteDialogController', WebsiteDialogController);

    WebsiteDialogController.$inject = ['$scope', '$mdDialog', 'entity', 'Website','WebTemplate','User'];

    function WebsiteDialogController ( $scope, $mdDialog, entity, Website, WebTemplate, User) {
        var vm = this;

        vm.templates = [];
        vm.users = [];

        vm.website = entity;
        vm.isDomainError = false;
        vm.closeDialog = closeDialog;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        function closeDialog () {
            $mdDialog.cancel('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.website.id !== null) {
                Website.update(vm.website, onSaveSuccess, onSaveError);
            } else {
                Website.save(vm.website, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gsiteApp:websiteUpdate', result);
            $mdDialog.hide(result);
            vm.isSaving = false;
        }

        function onSaveError (result) {
            vm.isSaving = false;
            if(result.data != null){
                vm.isDomainError = true;
            }
        }

        vm.datePickerOpenStatus.created = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }

        findAllTemplates();

        function findAllTemplates() {
            WebTemplate.query({
                page: 0,
                size: 10
            }, onSuccess);

            function onSuccess(data) {
                for (var i = 0; i < data.length; i++) {
                    vm.templates.push(data[i]);
                }
            }
        }


        findAllUsers();

        function findAllUsers() {
            User.query({
                page: 0,
                size: 10
            }, onSuccess);

            function onSuccess(data) {
                for (var i = 0; i < data.length; i++) {
                    vm.users.push(data[i]);
                }
            }
        }
    }
})();
