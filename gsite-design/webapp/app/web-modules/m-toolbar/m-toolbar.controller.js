(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('MToolBarController', MToolBarController);

    MToolBarController.$inject = ['$scope','$state', '$mdSidenav', 'entity'];

    function MToolBarController($scope,$state, $mdSidenav, entity) {
        var vm = this;

        vm.toolbar = entity;
        if (vm.toolbar == null)
            loadDefault();

        // sidenav
        vm.toggleLeft = buildToggler('m-sidenav');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        function loadDefault() {
            vm.toolbar = {
                isEnable: true,
                title: 'Person',
                textColor: '#FFFFFF'
            };

            vm.homeState = $state.current.name;

            // prevent reload page => make change root state
            if (vm.homeState.indexOf('.') > 0) {
                vm.homeState = vm.homeState.split('.')[0];
            }
        }
    }
})();