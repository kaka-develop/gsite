(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FeedbackDialogController', FeedbackDialogController);

    FeedbackDialogController.$inject = [ '$scope', '$mdDialog', 'entity', 'Feedback', 'User'];

    function FeedbackDialogController ( $scope,$mdDialog, entity, Feedback, User) {
        var vm = this;

        vm.users = [];

        vm.feedback = entity;
        vm.closeDialog = closeDialog;
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
            $scope.$emit('gsiteApp:feedbackUpdate', result);
            $mdDialog.hide(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        findAllUsers();

        function findAllUsers() {
            User.query({
                page: 0,
                size: 10
            }, onSuccess);

            function onSuccess(data) {
                for(var i = 0; i < data.length; i++){
                    vm.users.push(data[i]);
                }
            }
        }
    }
})();
