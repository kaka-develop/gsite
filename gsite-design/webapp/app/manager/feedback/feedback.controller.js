(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FeedbackController', FeedbackController);

    FeedbackController.$inject = ['$scope', '$state', 'Feedback', 'AlertService'];

    function FeedbackController($scope, $state, Feedback, AlertService) {
        var vm = this;

        vm.feedbacks = [];
        vm.loadPage = loadPage;

        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.predicate = 'id';
        vm.reset = reset;
        vm.reverse = true;

        loadAll();

        function loadAll() {
            vm.feedbacks = Feedback.all();
        }

        function reset() {
           
        }

        function loadPage(page) {
          
        }
    }
})();