(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('WebsiteController', WebsiteController);

    WebsiteController.$inject = ['Website'];

    function WebsiteController(Website) {
        var vm = this;

        vm.websites = [];

        loadAll();

        function loadAll() {
            Website.query(function (result) {
                vm.websites = result;
            });
        }
    }
})();
