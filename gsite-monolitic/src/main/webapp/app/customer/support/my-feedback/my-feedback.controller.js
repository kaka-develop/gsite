(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyFeedbackController', MyFeedbackController);

    MyFeedbackController.$inject = ['$scope','MyFeedbackService'];

    function MyFeedbackController ($scope,MyFeedbackService) {
        var vm = this;

        vm.feedbacks = [];

        vm.feedbacks = MyFeedbackService.all();


        MyFeedbackService.subscribe($scope, function somethingChanged() {
            vm.feedbacks = MyFeedbackService.all();
        });
    }
})();
