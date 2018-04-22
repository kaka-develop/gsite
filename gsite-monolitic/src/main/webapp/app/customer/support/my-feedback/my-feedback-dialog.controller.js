(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyFeedbackDialogController', MyFeedbackDialogController);

    MyFeedbackDialogController.$inject = ['$scope', '$mdDialog', 'MyFeedbackService'];

    function MyFeedbackDialogController($scope, $mdDialog, MyFeedbackService) {
        var vm = this;
        vm.feedback = {
            title: null,
            content: null,
            created: new Date(),
            user_id: null
        };

        vm.closeDialog = closeDialog;
        vm.submit = submit;

        function closeDialog() {
            $mdDialog.cancel();
        }

        function submit() {
            MyFeedbackService.add(vm.feedback);
            $mdDialog.hide();
        }


    }
})();
