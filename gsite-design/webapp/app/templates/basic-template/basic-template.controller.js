(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('BasicTemplateController', BasicTemplateController);

    BasicTemplateController.$inject = ['$scope','MSongService'];

    function BasicTemplateController($scope,MSongService) {
        var vm = this;

        $scope.$on("$destroy", function handler() {
            // destruction code here
            MSongService.stop();
        });
    }
})();
