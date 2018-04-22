(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('LatestTemplateController', LatestTemplateController);

    LatestTemplateController.$inject = ['$scope','MSongService'];

    function LatestTemplateController($scope,MSongService) {
        var vm = this;

        $scope.$on('$destroy', function handler() {
            // destruction code here
            MSongService.stop();
        });
    }
})();
