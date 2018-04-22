(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('QuestionController', QuestionController);

    QuestionController.$inject = [ 'Question', 'AlertService'];

    function QuestionController ( Question, AlertService) {
        var vm = this;

        vm.questions = [];

        loadAll();

        function loadAll () {
            Question.query({}, onSuccess, onError);

            function onSuccess(data) {
                vm.questions = data;
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

    }
})();
