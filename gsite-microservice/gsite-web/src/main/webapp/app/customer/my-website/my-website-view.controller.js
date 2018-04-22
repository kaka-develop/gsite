(function() {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteViewController', MyWebsiteViewController);

    MyWebsiteViewController.$inject = ['$scope','MSongService'];

    function MyWebsiteViewController($scope,MSongService) {
        var vm = this;


        $scope.$on("$destroy", function handler() {
            // destruction code here
            MSongService.stop();
        });

    }
})();
