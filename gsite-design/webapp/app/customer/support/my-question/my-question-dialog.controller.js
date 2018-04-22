(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyQuestionDialogController', MyQuestionDialogController);

    MyQuestionDialogController.$inject = ['$scope', '$mdDialog', 'AlertService', 'MyQuestionService'];

    function MyQuestionDialogController($scope, $mdDialog, AlertService, MyQuestionService) {
        var vm = this;
        vm.question = {
            title: null,
            answer: null
        };

        vm.closeDialog = closeDialog;
        vm.submit = submit;

        function closeDialog() {
            $mdDialog.cancel();
        }

        function submit() {
            MyQuestionService.add(vm.question);
            AlertService.success('Send successfully!');
            $mdDialog.hide();
        }


    }
})();
