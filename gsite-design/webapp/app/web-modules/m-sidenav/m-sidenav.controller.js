(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MSidenavController', MSidenavController);

    MSidenavController.$inject = ['$scope', '$mdSidenav', 'entity'];

    function MSidenavController($scope, $mdSidenav, entity) {
        var vm = this;

        vm.sidenav = entity;
        if (vm.sidenav == null)
            loadDefault();
        // sidenav
        vm.toggleLeft = buildToggler('m-sidenav');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            }
        }

        function loadDefault() {
            vm.sidenav = {
                isEnable: true,
                title: 'About Person',
                textColor: '#FFFFFF',
                backgroundColor: 'white'
            };
        }
    }
})();
