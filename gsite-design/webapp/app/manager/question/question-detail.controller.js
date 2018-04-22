(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('QuestionDetailController', QuestionDetailController);

    QuestionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Question'];

    function QuestionDetailController($scope, $rootScope, $stateParams, entity, Question) {
        var vm = this;

        vm.question = entity;


    }
})();
