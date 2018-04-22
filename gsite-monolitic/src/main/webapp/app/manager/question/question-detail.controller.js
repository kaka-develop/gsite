(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('QuestionDetailController', QuestionDetailController);

    QuestionDetailController.$inject = ['$scope', '$rootScope', 'previousState', 'entity', 'Question'];

    function QuestionDetailController($scope, $rootScope, previousState, entity, Question) {
        var vm = this;

        vm.question = entity;
        vm.previousState = previousState.name;
        vm.setFrequent = setFrequent;



        function setFrequent() {
            if(vm.question.id != null)
                Question.update(vm.question);
        }

        var unsubscribe = $rootScope.$on('gsiteApp:questionUpdate', function(event, result) {
            vm.question = result;
        });
        $scope.$on('$destroy', unsubscribe);


    }
})();
