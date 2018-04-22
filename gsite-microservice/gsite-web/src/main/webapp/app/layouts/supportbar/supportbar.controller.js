(function () {
    'use strict';

    angular
        .module('gsiteApp')
        .controller('SupportBarController', SupportBarController);

    SupportBarController.$inject = ['$state','Principal'];

    function SupportBarController($state,Principal) {
        var vm = this;
        vm.currentState = $state.current.name;

        vm.isAuthenticated = Principal.isAuthenticated;

    }
})();
