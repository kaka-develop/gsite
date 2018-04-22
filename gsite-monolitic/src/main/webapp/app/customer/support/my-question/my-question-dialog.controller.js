(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyQuestionDialogController', MyQuestionDialogController);

    MyQuestionDialogController.$inject = ['$mdDialog', 'MyQuestionService'];

    function MyQuestionDialogController($mdDialog, MyQuestionService) {
        var vm = this;
        vm.question = {
            content: null,
            answer: null,
            created: new Date(),
            is_frequent: false,
            userId: null
        };

        vm.closeDialog = closeDialog;
        vm.submit = submit;

        function closeDialog() {
            $mdDialog.cancel();
        }

        function submit() {
            MyQuestionService.add(vm.question);
            $mdDialog.hide();
        }


    }
})();
