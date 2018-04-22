(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyQuestionController', MyQuestionController);

    MyQuestionController.$inject = ['$scope','MyQuestionService'];

    function MyQuestionController ($scope,MyQuestionService) {
        var vm = this;

        vm.questions = [];

        vm.questions = MyQuestionService.all();

        MyQuestionService.subscribe($scope, function somethingChanged() {
            vm.questions = MyQuestionService.all();
        });
    }
})();
