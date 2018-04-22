(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('QuestionDialogController', QuestionDialogController);

    QuestionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$mdDialog', 'entity', 'Question', 'User'];

    function QuestionDialogController($timeout, $scope, $stateParams, $mdDialog, entity, Question, User) {
        var vm = this;

        vm.users = [];

        vm.question = entity;
        vm.closeDialog = closeDialog;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;


        function closeDialog() {
            $mdDialog.cancel('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.question.id !== null) {
                Question.update(vm.question, onSaveSuccess, onSaveError);
            } else {
                Question.save(vm.question, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {

        }

        function onSaveError() {

        }

        function openCalendar(date) {

        }

        findAllUsers();

        function findAllUsers() {
            vm.users = User.all();
        }
    }
})();