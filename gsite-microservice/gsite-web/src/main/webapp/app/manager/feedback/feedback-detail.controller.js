(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('FeedbackDetailController', FeedbackDetailController);

    FeedbackDetailController.$inject = ['$scope', '$rootScope',  'previousState', 'entity'];

    function FeedbackDetailController($scope, $rootScope, previousState, entity) {
        var vm = this;

        vm.feedback = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gsiteApp:feedbackUpdate', function(event, result) {
            vm.feedback = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
