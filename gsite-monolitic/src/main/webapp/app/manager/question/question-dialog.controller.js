(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('QuestionDialogController', QuestionDialogController);

    QuestionDialogController.$inject = ['$scope', '$mdDialog', 'entity', 'Question', 'User'];

    function QuestionDialogController ( $scope, $mdDialog, entity, Question, User) {
        var vm = this;

        vm.users = [];

        vm.question = entity;
        vm.closeDialog = closeDialog;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;


        function closeDialog () {
            $mdDialog.cancel('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.question.id !== null) {
                Question.update(vm.question, onSaveSuccess, onSaveError);
            } else {
                Question.save(vm.question, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gsiteApp:questionUpdate', result);
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

        findAllUsers();

        function findAllUsers() {
            User.query({
                page: 0,
                size: 5
            }, onSuccess);

            function onSuccess(data) {
                for(var i = 0; i < data.length; i++){
                    vm.users.push(data[i]);
                }
            }
        }
    }
})();
