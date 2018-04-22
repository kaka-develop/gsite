(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebTemplateDialogController', WebTemplateDialogController);

    WebTemplateDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$mdDialog', 'entity', 'WebTemplate'];

    function WebTemplateDialogController($timeout, $scope, $stateParams, $mdDialog, entity, WebTemplate) {
        var vm = this;

        vm.sources = ['basic-template', 'latest-template', 'beautiful-template'];
        vm.webTemplate = entity;

        vm.save = save;
        vm.closeDialog = closeDialog;

        function closeDialog() {
            $mdDialog.cancel();
        }

        function save() {
            vm.isSaving = true;
            if (vm.webTemplate.id !== null) {
                WebTemplate.update(vm.webTemplate, onSaveSuccess, onSaveError);
            } else {
                WebTemplate.save(vm.webTemplate, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {

        }

        function onSaveError() {

        }



    }
})();