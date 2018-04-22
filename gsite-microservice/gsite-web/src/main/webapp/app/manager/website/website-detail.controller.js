(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsiteDetailController', WebsiteDetailController);

    WebsiteDetailController.$inject = ['$scope', '$rootScope', 'previousState', 'entity'];

    function WebsiteDetailController($scope, $rootScope, previousState, entity) {
        var vm = this;

        vm.website = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gsiteApp:websiteUpdate', function(event, result) {
            vm.website = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
