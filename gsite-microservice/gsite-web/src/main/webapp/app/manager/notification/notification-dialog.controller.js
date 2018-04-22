(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('NotificationDialogController', NotificationDialogController);

    NotificationDialogController.$inject = [ '$scope',  '$mdDialog', 'entity', 'Notification'];

    function NotificationDialogController ( $scope,  $mdDialog, entity, Notification) {
        var vm = this;

        vm.users = [];

        vm.notification = entity;
        vm.closeDialog = closeDialog;
        vm.save = save;


        function closeDialog () {
            $mdDialog.cancel('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.notification.id !== null) {
                Notification.update(vm.notification, onSaveSuccess, onSaveError);
            } else {
                Notification.save(vm.notification, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gsiteApp:notificationUpdate', result);
            $mdDialog.hide(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
