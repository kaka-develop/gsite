(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('BeautifulTemplateController', BeautifulTemplateController);

    BeautifulTemplateController.$inject = ['$scope','MSongService'];

    function BeautifulTemplateController($scope,MSongService) {
        var vm = this;

        $scope.$on('$destroy', function handler() {
            // destruction code here
            MSongService.stop();
        });
    }
})();
