(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebTemplateDialogController', WebTemplateDialogController);

    WebTemplateDialogController.$inject = [ '$scope', '$mdDialog', 'entity', 'WebTemplate'];

    function WebTemplateDialogController ( $scope, $mdDialog, entity, WebTemplate) {
        var vm = this;

        vm.sources = ['basic-template','latest-template','beautiful-template'];
        vm.webTemplate = entity;
        vm.closeDialog = closeDialog;
        vm.save = save;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;


        function closeDialog () {
            $mdDialog.cancel('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.webTemplate.id !== null) {
                WebTemplate.update(vm.webTemplate, onSaveSuccess, onSaveError);
            } else {
                WebTemplate.save(vm.webTemplate, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gsiteApp:webTemplateUpdate', result);
            $mdDialog.hide(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.datePickerOpenStatus.created = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }

    }
})();
