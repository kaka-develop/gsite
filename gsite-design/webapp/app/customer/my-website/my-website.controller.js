(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MyWebsiteController', MyWebsiteController);

    MyWebsiteController.$inject = ['$scope', 'AlertService', 'MyWebsiteService'];

    function MyWebsiteController($scope, AlertService, MyWebsiteService) {
        var vm = this;
        vm.currentPage = 0;
        vm.websites = [];

        vm.websites = MyWebsiteService.all();

        // paging
        vm.paging = {
            total: 3,
            current: 1,
            onPageChanged: loadPages,
        };

        function loadPages() {
            vm.currentPage = vm.paging.current;
        }


    }
})();
