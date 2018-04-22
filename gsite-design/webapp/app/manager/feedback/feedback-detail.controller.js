(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FeedbackDetailController', FeedbackDetailController);

    FeedbackDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Feedback'];

    function FeedbackDetailController($scope, $rootScope, $stateParams, entity, Feedback) {
        var vm = this;

        vm.feedback = entity;
     
    }
})();
