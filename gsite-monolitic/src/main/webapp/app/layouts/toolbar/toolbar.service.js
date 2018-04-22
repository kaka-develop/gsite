(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .provider('ToolbarService', ToolbarService);

    function ToolbarService() {
        this.$get = getService;

        getService.$inject = ['$mdSidenav'];

        function getService($mdSidenav) {

            return {
                toggleSidenav: toggleSidenav
            };

            function toggleSidenav() {
                return function () {
                    return $mdSidenav('sidenav')
                        .toggle();
                };
            }
        }

    }
})();