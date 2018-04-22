(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FeedbackDialogController', FeedbackDialogController);

    FeedbackDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$mdDialog', 'entity', 'Feedback', 'User'];

    function FeedbackDialogController ($timeout, $scope, $stateParams, $mdDialog, entity, Feedback, User) {
        var vm = this;

        vm.users = [];

        vm.feedback = entity;
        vm.closeDialog = closeDialog;
        vm.datePickerOpenStatus = {};
        vm.save = save;

      
        function closeDialog () {
            $mdDialog.cancel('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.feedback.id !== null) {
                Feedback.update(vm.feedback, onSaveSuccess, onSaveError);
            } else {
                Feedback.save(vm.feedback, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
          
        }

        function onSaveError () {
           
        }

    

        findAllUsers();

        function findAllUsers() {
            vm.users = User.all();
        }
    }
})();
