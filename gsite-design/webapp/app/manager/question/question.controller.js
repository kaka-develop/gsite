(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('QuestionController', QuestionController);

    QuestionController.$inject = ['$scope', '$state', 'Question', 'AlertService'];

    function QuestionController($scope, $state, Question, AlertService) {
        var vm = this;

        vm.questions = [];
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
            vm.questions = Question.all();
        }

        function reset() {

        }

        function loadPage(page) {

        }
    }
})();