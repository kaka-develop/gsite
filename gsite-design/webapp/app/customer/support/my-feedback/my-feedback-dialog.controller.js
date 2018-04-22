(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyFeedbackDialogController', MyFeedbackDialogController);

    MyFeedbackDialogController.$inject = ['$scope', '$mdDialog', 'AlertService', 'MyFeedbackService', 'MyFeedbackOptionService'];

    function MyFeedbackDialogController($scope, $mdDialog, AlertService, MyFeedbackService, MyFeedbackOptionService) {
        var vm = this;
        vm.feedback = {
            title: null,
            content: null
        };

        vm.closeDialog = closeDialog;
        vm.submit = submit;
        vm.feedbackOptions = [];

        vm.feedbackOptions = MyFeedbackOptionService.all();

        function closeDialog() {
            $mdDialog.cancel();
        }

        function submit() {
            vm.feedback.title = vm.feedbackOptions[vm.foIndex].title;
            MyFeedbackService.add(vm.feedback);
            AlertService.success('Send successfully!');
            $mdDialog.hide();
        }


    }
})();