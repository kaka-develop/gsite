(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsiteController', WebsiteController);

    WebsiteController.$inject = ['$scope', '$state', 'Website'];

    function WebsiteController($scope, $state, Website) {
        var vm = this;

        vm.websites = [];

        loadAll();

        function loadAll() {
            vm.websites = Website.all();
        }
    }
})();